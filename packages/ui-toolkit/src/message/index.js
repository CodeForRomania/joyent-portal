import React from 'react';
import is from 'styled-is';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unitcalc from 'unitcalc';
import remcalc from 'remcalc';

import { H4 } from '../text/headings';
import P from '../text/p';
import { Close } from '../icons';

const Container = styled.div`
  position: relative;
  margin-bottom: ${unitcalc(2)};
  background-color: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows.bottomShadow};
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  width: 100%;
  display: flex;
`;

const Color = styled.div`
  min-width: ${remcalc(36)};
  margin-right: ${remcalc(18)};
  min-height: 100%;
  background-color: ${props => props.theme.green};

  ${is('error')`
    background-color: ${props => props.theme.red};
  `};

  ${is('warning')`
    background-color: ${props => props.theme.orange};
  `};
`;

const Outlet = styled.div`
  /* trick prettier */
  padding: ${unitcalc(2)} 0 ${unitcalc(2.25)} 0;
`;

const CloseButton = styled(Close)`
  position: absolute;
  right: ${unitcalc(0.5)};
  margin: 0;
`;

export const Message = ({ onCloseClick, children, ...type }) => (
  <Container>
    <Color {...type} />
    <Outlet>{children}</Outlet>
    {onCloseClick && <CloseButton onClick={onCloseClick} />}
  </Container>
);

export const Title = ({ children }) => <H4>{children}</H4>;

export const Description = ({ children }) => <P>{children}</P>;

Message.propTypes = {
  /**
   * Function to call when the close button is clicked
   */
  onCloseClick: PropTypes.func,
  /**
   * Is it an error message ?
   */
  error: PropTypes.bool,
  /**
   * Is it an warning message ?
   */
  warning: PropTypes.bool,
  /**
   * Is it an success message ?
   */
  success: PropTypes.bool
};

Message.defaultProps = {
  onCloseClick: () => {},
  error: false,
  warning: false,
  success: true
};

export default Message;
