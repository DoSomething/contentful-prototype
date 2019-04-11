import React from 'react';
import PropTypes from 'prop-types';

import TextContent from '../utilities/TextContent/TextContent';

import './affiliate-opt-in-toggle.scss';

const AffiliateOptInToggle = ({
  affiliateOptInContent,
  affiliateMessagingOptIn,
  clickedOptIn,
}) => (
  <div className="form-wrapper affiliate-opt-in">
    <label className="option -checkbox" htmlFor="affiliate_opt_in">
      <input
        type="checkbox"
        id="opt_in"
        name="affiliate_opt_in"
        value={affiliateMessagingOptIn}
        defaultChecked={affiliateMessagingOptIn}
        className="form-checkbox opt_in_checkbox"
        onClick={clickedOptIn}
      />
      <TextContent styles={{ textColor: '#fff' }}>
        {affiliateOptInContent}
      </TextContent>
    </label>
  </div>
);

AffiliateOptInToggle.propTypes = {
  clickedOptIn: PropTypes.func.isRequired,
  affiliateMessagingOptIn: PropTypes.bool.isRequired,
  affiliateOptInContent: PropTypes.object.isRequired,
};

export default AffiliateOptInToggle;
