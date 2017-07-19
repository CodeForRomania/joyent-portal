import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import remcalc from 'remcalc';
import { borderRadius } from '../boxes';
import Baseline from '../baseline';
import { A, Button as NButton } from 'normalized-styled-components';
import { Link } from 'react-router-dom';

const style = css`
  border-radius: ${borderRadius};
  border: solid ${remcalc(1)} ${props => props.theme.grey};
  background-color: ${props => props.theme.white};
  box-sizing: border-box;
  display: inline-block;
  justify-content: center;
  align-items: center;
  padding: ${remcalc(15)} ${remcalc(18)};
  position: relative;
  text-align: center;
  line-height: normal;
  vertical-align: middle;
  touch-action: manipulation;
  min-width: 0;
  cursor: pointer;

  &:focus {
    outline: 0;
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.grey};
  }

  &:hover {
    background-color: ${props => props.theme.whiteHover};
    border-color: ${props => props.theme.grey};
  }

  &:active,
  &:active:hover,
  &:active:focus {
    outline: 0;
    background-color: ${props => props.theme.whiteActive};
    border-color: ${props => props.theme.grey};
  }

  &[disabled] {
    cursor: not-allowed;
    pointer-events: none;
    color: ${props => props.theme.grey};
    background-color: ${props => props.theme.disabled};
    border-color: ${props => props.theme.grey};

    &:focus {
      background-color: ${props => props.theme.disabled};
      border-color: ${props => props.theme.grey};
    }

    &:hover {
      background-color: ${props => props.theme.disabled};
      border-color: ${props => props.theme.disabled};
    }

    &:active,
    &:active:hover,
    &:active:focus {
      background-color: ${props => props.theme.disabled};
      border-color: ${props => props.theme.disabled};
    }
  }
`;

const StyledButton = NButton.extend`
  ${style}
`;

const StyledAnchor = A.extend`
  display: inline-block;
  ${style}
`;

const StyledLink = styled(Link)`
  display: inline-block;
  ${style}
`;

const StyledDiv = styled.div`
  height: ${remcalc(16)};
`;

/**
 * @example ./usage.md
 */
const IconButton = props => {
  const { href = '', to = '', children } = props;

  const Views = [
    () => (to ? StyledLink : null),
    () => (href ? StyledAnchor : null),
    () => StyledButton
  ];

  const View = Views.reduce((sel, view) => (sel ? sel : view()), null);

  return (
    <View {...props}>
      <StyledDiv>
        {children}
      </StyledDiv>
    </View>
  );
};

IconButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default Baseline(IconButton);
