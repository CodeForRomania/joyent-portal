import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import { compose } from 'react-apollo';
import { destroy, reset } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';

import { AffinityIcon, P, Button, H3 } from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import { Rule, Header } from '@components/create-instance/affinity';
import KeyValue from '@components/instances/key-value';

const FORM_NAME_CREATE = 'CREATE-INSTANCE-AFFINITY-ADD';
const FORM_NAME_EDIT = i => `CREATE-INSTANCE-AFFINITY-EDIT-${i}`;

const RULE_DEFAULTS = {
  'rule-instance-name': '',
  'rule-instance-conditional': 'must',
  'rule-instance-placement': 'same',
  'rule-instance-tag-key-pattern': 'equalling',
  'rule-instance-tag-value-pattern': 'equalling',
  'rule-instance-name-pattern': 'equalling',
  'rule-instance-tag-value': '',
  'rule-instance-tag-key': '',
  'rule-type': 'name'
};

export const Affinity = ({
  affinityRules = [],
  expanded,
  proceeded,
  addOpen,
  handleAddAffinityRules,
  handleRemoveAffinityRule,
  handleUpdateAffinityRule,
  handleToggleExpanded,
  handleCancelEdit,
  handleChangeAddOpen,
  handleNext,
  handleEdit,
  rule
}) => (
  <Fragment>
    <Title icon={<AffinityIcon />}>Affinity</Title>
    {expanded ? (
      <Margin bottom={3}>
        <P>
          Affinity rules control the location of instances, to help reduce
          traffic across networks and keep the workload balanced. With strict
          rules, instances are only provisioned when the criteria is met.{' '}
          <a
            target="__blank"
            href="https://apidocs.joyent.com/docker/features/placement"
          >
            Read the docs
          </a>
        </P>
      </Margin>
    ) : null}
    {proceeded ? (
      <Margin bottom={4}>
        <H3>
          {affinityRules.length} Affinity Rule{affinityRules.length === 1 ? '' : 's'}
        </H3>
      </Margin>
    ) : null}
    {affinityRules.map((rule, index) => (
      <ReduxForm
        form={FORM_NAME_EDIT(index)}
        key={index}
        initialValues={rule}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={true}
        onSubmit={newValue => handleUpdateAffinityRule(index, newValue)}
      >
        {props => (
          <KeyValue
            {...props}
            expanded={rule.expanded}
            customHeader={<Header {...rule} />}
            method="edit"
            input={props => <Rule {...rule} {...props} />}
            type="an affinity rule"
            onToggleExpanded={() => handleToggleExpanded(index)}
            onCancel={() => handleCancelEdit(index)}
            onRemove={() => handleRemoveAffinityRule(index)}
          />
        )}
      </ReduxForm>
    ))}
    {expanded && addOpen ? (
      <ReduxForm
        form={FORM_NAME_CREATE}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={true}
        onSubmit={handleAddAffinityRules}
      >
        {props => (
          <KeyValue
            {...props}
            method="create"
            input={props => <Rule {...rule} {...props} />}
            type="an affinity rule"
            expanded
            noRemove
            onCancel={() => handleChangeAddOpen(false)}
          />
        )}
      </ReduxForm>
    ) : null}
    <div>
      {expanded ? (
        <Fragment>
          <Button
            type="button"
            onClick={() => handleChangeAddOpen(true)}
            secondary
          >
            Create affinity rule
          </Button>
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        </Fragment>
      ) : proceeded ? (
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      ) : null}
    </div>
  </Fragment>
);

export default compose(
  connect(({ values, form }, ownProps) => ({
    proceeded: get(values, 'create-instance-affinity-proceeded', false),
    addOpen: get(values, 'create-instance-affinity-add-open', false),
    affinityRules: get(values, 'create-instance-affinity', []),
    rule: get(form, `${FORM_NAME_CREATE}.values`, {})
  })),
  connect(null, (dispatch, { affinityRules = [], history }) => ({
    handleNext: () => {
      dispatch(
        set({ name: 'create-instance-affinity-proceeded', value: true })
      );

      return history.push(`/instances/~create/done`);
    },
    handleEdit: () => {
      return history.push(`/instances/~create/affinity`);
    },
    handleAddAffinityRules: ({ ...rule }) => {
      const toggleToClosed = set({
        name: `create-instance-affinity-add-open`,
        value: false
      });

      const appendAffinityRule = set({
        name: `create-instance-affinity`,
        value: affinityRules.concat([
          { ...RULE_DEFAULTS, ...rule, expanded: false }
        ])
      });

      return dispatch([
        destroy(FORM_NAME_CREATE),
        toggleToClosed,
        appendAffinityRule
      ]);
    },
    handleUpdateAffinityRule: (index, newAffinityRule) => {
      affinityRules[index] = {
        ...newAffinityRule,
        expanded: false
      };

      return dispatch([
        destroy(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-affinity`, value: affinityRules.slice() })
      ]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(FORM_NAME_CREATE),
        set({ name: `create-instance-affinity-add-open`, value })
      ]);
    },
    handleToggleExpanded: index => {
      affinityRules[index] = {
        ...affinityRules[index],
        expanded: !affinityRules[index].expanded
      };

      return dispatch(
        set({
          name: `create-instance-affinity`,
          value: affinityRules.slice()
        })
      );
    },
    handleCancelEdit: index => {
      affinityRules[index] = {
        ...affinityRules[index],
        expanded: false
      };

      return dispatch([
        reset(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-affinity`, value: affinityRules.slice() })
      ]);
    },
    handleRemoveAffinityRule: index => {
      affinityRules.splice(index, 1);

      return dispatch([
        destroy(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-affinity`, value: affinityRules.slice() })
      ]);
    }
  }))
)(Affinity);