import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import Tooltip from './Tooltip';
import TooltipQuestionMarkImage from './TooltipQuestionMark.svg';

const CampaignInfoBlockTooltip = ({ tooltipContent }) => (
  <Tooltip tooltipContent={tooltipContent}>
    <div
      className="pl-1"
      css={css`
        width: 20px;
      `}
    >
      <img alt="Question mark" src={TooltipQuestionMark} />
    </div>
  </Tooltip>
);

CampaignInfoBlockTooltip.propTypes = {
  tooltipContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};

export default TooltipQuestionMark;
