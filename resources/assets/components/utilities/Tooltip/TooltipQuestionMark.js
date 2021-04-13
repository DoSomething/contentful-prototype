import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from './Tooltip';
import TooltipQuestionMarkImage from './TooltipQuestionMark.svg';

const TooltipQuestionMark = ({ tooltipContent }) => (
  <Tooltip tooltipContent={tooltipContent}>
    <img
      alt="Question mark"
      src={TooltipQuestionMarkImage}
      className="w-5 ml-1 -mb-1 relative"
    />
  </Tooltip>
);

TooltipQuestionMark.propTypes = {
  tooltipContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};

export default TooltipQuestionMark;
