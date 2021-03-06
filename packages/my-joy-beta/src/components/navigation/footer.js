import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

const List = styled.ul`
  display: flex;
  list-style: none;
  padding: ${remcalc(12)} ${remcalc(18)};
  border-top: ${remcalc(1)} solid ${props => props.theme.grey};
  width: 100%;
  justify-content: flex-end;
  position: absolute;
  box-sizing: border-box;
  margin: 0;
  bottom: 0;
`;

const ListItem = styled.li`
  color: ${props => props.theme.greyDark};
  &:not(:last-child) {
    padding-right: ${remcalc(24)};
  }
`;

const Link = styled.a`
  color: ${props => props.theme.greyDark};
  text-decoration: none;
`;

export default () => (
  <List>
    <ListItem>
      <Link href="https://www.joyent.com/about/policies" target="_blank">
        Policies
      </Link>
    </ListItem>
    <ListItem>
      <Link href="https://www.joyent.com/networking-and-security/security-compliance">
        Compliance
      </Link>
    </ListItem>
    <ListItem>
      <b>© {new Date().getFullYear()} Joyent, Inc.</b>
    </ListItem>
  </List>
);
