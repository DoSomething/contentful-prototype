import PropTypes from 'prop-types';
import React from 'react';

import './campaignSignupArrow.scss';

const CampaignSignupArrow = ({ content, className }) => (
  <div className={`message-callout -above -white ${className}`}>
    <div className="message-callout__copy">
      <p>{content}</p>
    </div>
  </div>
);

CampaignSignupArrow.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CampaignSignupArrow.defaultProps = {
  className: '-dynamic-right',
};

export default CampaignSignupArrow;
