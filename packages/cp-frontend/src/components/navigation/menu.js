// TODO need to sort out navlinks

import React from 'react';
import PropTypes from 'prop-types';
import forceArray from 'force-array';

import { LayoutContainer } from '@components/layout';

import {
  SectionList,
  SectionListItem,
  SectionListNavLink
} from 'joyent-ui-toolkit';

const getMenuItems = (...links) =>
  forceArray(links).map(({ pathname, name }) =>
    <SectionListItem>
      <SectionListNavLink activeClassName="active" to={pathname}>
        {name}
      </SectionListNavLink>
    </SectionListItem>
  );

const Menu = ({ links = [] }) =>
  <LayoutContainer>
    <SectionList>
      {getMenuItems(...links)}
    </SectionList>
  </LayoutContainer>;

Menu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      pathname: PropTypes.string
    })
  )
};

export default Menu;
