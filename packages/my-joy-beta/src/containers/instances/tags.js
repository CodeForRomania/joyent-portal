import React from 'react';
import PropTypes from 'prop-types';
import paramCase from 'param-case';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';
import find from 'lodash.find';
import get from 'lodash.get';

import {
  ViewContainer,
  Title,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle
} from 'joyent-ui-toolkit';

import { KeyValue } from '@components/instances';
import GetTags from '@graphql/list-tags.gql';
import PutTags from '@graphql/add-tags.gql';

const TagForms = (tags = []) =>
  tags.map(({ key, formName, formValue, value, name }) => {
    const TagForm = reduxForm({
      form: `instance-tags-${key}`,
      initialValues: {
        [formName]: name,
        [formValue]: value
      }
    })(KeyValue);

    return (
      <TagForm
        key={key}
        formName={formName}
        formValue={formValue}
        name={key}
        onSubmit={val => console.log(key, val)}
        onRemove={key => console.log('remove', key)}
      />
    );
  });

const Tags = ({ tags = [], loading, error }) => {
  const values = forceArray(tags);
  const _title = <Title>Tags</Title>;
  const _loading = loading && !values.length ? <StatusLoader /> : null;

  const _tags = !_loading && TagForms(tags);

  const _error =
    error && !values.length && !_loading ? (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instance tags
        </MessageDescription>
      </Message>
    ) : null;

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_title}
      {_loading}
      {_error}
      {_tags}
    </ViewContainer>
  );
};

Tags.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(GetTags, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => {
      const values = get(
        find(get(rest, 'machines', []), ['name', variables.name]),
        'tags',
        []
      );

      const tags = values.reduce((all, { name, value }) => {
        const key = paramCase(name);

        return {
          ...all,
          [key]: {
            key,
            formName: `${key}-name`,
            formValue: `${key}-value`,
            value,
            name
          }
        };
      }, {});

      return { tags: Object.values(tags), loading, error };
    }
  }),
  graphql(PutTags, {
    props: ({ mutate, ownProps }) => ({
      updateTag: (name = '', value = '') =>
        mutate({
          variables: { name, value }
        })
    })
  })
)(Tags);