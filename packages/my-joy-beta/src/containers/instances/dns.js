import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle
} from 'joyent-ui-toolkit';

import ListDNS from '@graphql/list-dns.gql';

const DNS = ({ instance, loading, error }) => {
  // eslint-disable-next-line camelcase
  const { name, dns_names } = instance || {};
  // eslint-disable-next-line camelcase
  const _loading = loading && !name && !dns_names && <StatusLoader />;
  const _summary = !_loading &&
    instance && <pre>{JSON.stringify(dns_names, null, 2)}</pre>;

  const _error = error &&
    !_loading &&
    !instance && (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instance DNS
        </MessageDescription>
      </Message>
    );

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_loading}
      {_error}
      {_summary}
    </ViewContainer>
  );
};

DNS.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(ListDNS, {
    options: ({ match }) => ({
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => ({
      instance: find(get(rest, 'machines', []), ['name', variables.name]),
      loading,
      error
    })
  })
)(DNS);
