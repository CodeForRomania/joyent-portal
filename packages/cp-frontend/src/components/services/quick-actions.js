import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, TooltipButton, TooltipDivider } from 'joyent-ui-toolkit';

const ServicesQuickActions = ({ show, position, service, onBlur }) => {
  if (!show) {
    return null;
  }

  const p = Object.keys(position).reduce((p, key) => {
    if (typeof position[key] === 'number') {
      p[key] = `${position[key]}px`;
    } else {
      p[key] = position[key];
    }
    return p;
  }, {});

  return (
    <Tooltip {...p} onBlur={onBlur}>
      <TooltipButton onClick={() => {}}>Scale</TooltipButton>
      <TooltipButton>Restart</TooltipButton>
      <TooltipButton>Stop</TooltipButton>
      <TooltipDivider />
      <TooltipButton>Delete</TooltipButton>
    </Tooltip>
  );
};

ServicesQuickActions.propTypes = {
  service: PropTypes.object,
  position: PropTypes.object,
  show: PropTypes.bool,
  onBlur: PropTypes.func
};

export default ServicesQuickActions;