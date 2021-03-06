/* eslint-disable camelcase */

import React from 'react';
import { Margin } from 'styled-components-spacing';
import ReduxForm from 'declarative-redux-form';
import { stopSubmit, destroy } from 'redux-form';
import { connect } from 'react-redux';
import { destroyAll } from 'react-redux-values';
import { graphql, compose } from 'react-apollo';
import intercept from 'apr-intercept';
import constantCase from 'constant-case';
import get from 'lodash.get';
import omit from 'lodash.omit';
import uniqBy from 'lodash.uniqby';

import { ViewContainer, H2, Button } from 'joyent-ui-toolkit';

import Name from '@containers/create-instance/name';
import Image from '@containers/create-instance/image';
import Package from '@containers/create-instance/package';
import Tags from '@containers/create-instance/tags';
import Metadata from '@containers/create-instance/metadata';
import UserScript from '@containers/create-instance/user-script';
import Networks from '@containers/create-instance/networks';
import Firewall from '@containers/create-instance/firewall';
import CNS from '@containers/create-instance/cns';
import Affinity from '@containers/create-instance/affinity';
import CreateInstanceMutation from '@graphql/create-instance.gql';
import parseError from '@state/parse-error';

const CREATE_FORM = 'CREATE-INSTANCE';

const CreateInstance = ({ step, disabled, handleSubmit, history, match }) => (
  <ViewContainer>
    <Margin top={4} bottom={4}>
      <H2>Create Instances</H2>
    </Margin>
    <Margin bottom={4}>
      <Name history={history} match={match} expanded={step === 'name'} />
    </Margin>
    <Margin bottom={4}>
      <Image history={history} match={match} expanded={step === 'image'} />
    </Margin>
    <Margin bottom={4}>
      <Package history={history} match={match} expanded={step === 'package'} />
    </Margin>
    <Margin bottom={4}>
      <Tags history={history} match={match} expanded={step === 'tags'} />
    </Margin>
    <Margin bottom={4}>
      <Metadata
        history={history}
        match={match}
        expanded={step === 'metadata'}
      />
    </Margin>
    <Margin bottom={4}>
      <UserScript
        history={history}
        match={match}
        expanded={step === 'user-script'}
      />
    </Margin>
    <Margin bottom={4}>
      <Networks
        history={history}
        match={match}
        expanded={step === 'networks'}
      />
    </Margin>
    <Margin bottom={5}>
      <Firewall
        history={history}
        match={match}
        expanded={step === 'firewall'}
      />
    </Margin>
    <Margin bottom={4}>
      <CNS history={history} match={match} expanded={step === 'cns'} />
    </Margin>
    <Margin bottom={4}>
      <Affinity
        history={history}
        match={match}
        expanded={step === 'affinity'}
      />
    </Margin>
    <Margin top={7} bottom={10}>
      <ReduxForm form={CREATE_FORM} onSubmit={handleSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Button disabled={disabled} loading={submitting}>
              Deploy
            </Button>
          </form>
        )}
      </ReduxForm>
    </Margin>
  </ViewContainer>
);

export default compose(
  graphql(CreateInstanceMutation, { name: 'createInstance' }),
  connect(({ form, values }, { match }) => {
    const step = get(match, 'params.step', 'name');

    const disabled = ['name', 'image', 'package', 'networks'].some(
      step => !get(values, `create-instance-${step}-proceeded`, false)
    );

    if (disabled) {
      return { disabled, step };
    }

    const name = get(
      form,
      'create-instance-name.values.name',
      '<instance-name>'
    );

    const firewall_enabled = get(
      form,
      'CREATE-INSTANCE-FIREWALL.values.enabled',
      false
    );

    const image = get(
      form,
      'create-instance-image.values.image',
      '<instance-image>'
    );

    const pkg = get(
      form,
      'create-instance-package.values.package',
      '<instance-pkg>'
    );

    const networks = get(form, 'CREATE-INSTANCE-NETWORKS.values', {});

    const metadata = get(values, 'create-instance-metadata', []);
    const receivedTags = get(values, 'create-instance-tags', []);
    const affinity = get(values, 'create-instance-affinity', []);
    const cns = get(values, 'create-instance-cns-enabled', true);
    const cnsServices = get(values, 'create-instance-cns-services', null);
    const userScript = get(values, 'create-instance-user-script', {});

    const tags = receivedTags.map(a => omit(a, 'expanded'));

    tags.push({ name: 'triton.cns.disable', value: !cns });

    if (cnsServices && cns) {
      tags.push({ name: 'triton.cns.services', value: cnsServices.join(',') });
    }

    return {
      forms: Object.keys(form), // improve this
      name,
      pkg,
      image,
      affinity,
      metadata,
      userScript,
      tags,
      firewall_enabled,
      networks,
      disabled,
      step
    };
  }),
  connect(null, (dispatch, ownProps) => {
    const {
      name,
      pkg,
      image,
      affinity,
      metadata,
      userScript,
      tags,
      firewall_enabled,
      networks,
      forms,
      createInstance,
      history
    } = ownProps;

    return {
      handleSubmit: async () => {
        const _affinity = affinity
          .map(aff => ({
            conditional: aff['rule-instance-conditional'],
            placement: aff['rule-instance-placement'],
            identity: aff['rule-type'],
            key: aff['rule-instance-tag-key'],
            pattern: aff['rule-instance-tag-value-pattern'],
            value:
              aff['rule-type'] === 'name'
                ? aff['rule-instance-name']
                : aff['rule-instance-tag-value']
          }))
          .map(({ conditional, placement, identity, key, pattern, value }) => {
            const type = constantCase(
              `${conditional}_${placement === 'same' ? 'equal' : 'not_equal'}`
            );

            const patterns = {
              equalling: value => value,
              'not-equalling': value => `/^!${value}$/`,
              containing: value => `/${value}/`,
              starting: value => `/^${value}/`,
              ending: value => `/${value}$/`
            };

            const _key = identity === 'name' ? 'instance' : key;
            const _value = patterns[pattern](value);

            return {
              type,
              key: _key,
              value: _value
            };
          });

        const _name = name.toLowerCase();
        const _metadata = metadata.map(a => omit(a, 'open'));
        const _tags = uniqBy(tags, 'name').map(a => omit(a, 'expanded'));
        const _networks = Object.keys(networks).filter(
          network => networks[network]
        );

        if (userScript && userScript.value) {
          _metadata.push({ name: 'user-script', value: userScript.value });
        }

        const [err, res] = await intercept(
          createInstance({
            variables: {
              name: _name,
              package: pkg,
              image,
              affinity: _affinity.length ? _affinity : undefined,
              metadata: _metadata,
              tags: _tags,
              firewall_enabled,
              networks: _networks.length ? _networks : undefined
            }
          })
        );

        if (err) {
          return dispatch(
            stopSubmit(CREATE_FORM, {
              _error: parseError(err)
            })
          );
        }

        dispatch([destroyAll(), forms.map(name => destroy(name))]);

        history.push(`/instances/${res.data.createMachine.name}`);
      }
    };
  })
)(CreateInstance);
