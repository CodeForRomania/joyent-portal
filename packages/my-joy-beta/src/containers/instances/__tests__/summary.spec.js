import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Summary } from '../summary';
import Theme from '@mocks/theme';

it('renders <Summary /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Summary />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Summary loading /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Summary loading />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Summary loadingError /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Summary loadingError />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Summary mutationError /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Summary mutationError="some mutation error" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Summary starting stopping rebooting removing /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Summary starting stopping rebooting removing />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Summary starting stopping rebooting removing /> without throwing', () => {
  const instance1 = {
    id: '2252839a-e698-ceec-afac-9549ad0c6624',
    // eslint-disable-next-line camelcase
    compute_node: '70bb1cee-dba3-11e3-a799-002590e4f2b0',
    image: {
      id: '19aa3328-0025-11e7-a19a-c39077bfd4cf',
      name: 'Alpine 3'
    },
    // eslint-disable-next-line camelcase
    primary_ip: '72.2.119.146',
    ips: ['72.2.119.146', '10.112.5.63'],
    package: {
      name: 'g4-highcpu-128M'
    },
    brand: 'KVM',
    state: 'RUNNING'
  };

  expect(
    renderer
      .create(
        <Theme>
          <Summary instance={instance1} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();

  const instance2 = {
    id: '2252839a-e698-ceec-afac-9549ad0c6624',
    // eslint-disable-next-line camelcase
    compute_node: '70bb1cee-dba3-11e3-a799-002590e4f2b0',
    image: {
      id: '19aa3328-0025-11e7-a19a-c39077bfd4cf'
    },
    // eslint-disable-next-line camelcase
    primary_ip: '72.2.119.146',
    ips: ['72.2.119.146', '10.112.5.63'],
    package: {
      name: 'g4-highcpu-128M'
    },
    brand: 'LX',
    state: 'RUNNING'
  };

  expect(
    renderer
      .create(
        <Theme>
          <Summary instance={instance2} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
