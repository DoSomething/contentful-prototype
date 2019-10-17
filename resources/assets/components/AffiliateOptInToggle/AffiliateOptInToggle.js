import React from 'react';
import PropTypes from 'prop-types';

import TextContent from '../utilities/TextContent/TextContent';

import './affiliate-opt-in-toggle.scss';

const AffiliateOptInToggle = ({
  affiliateOptInContent,
  affiliateMessagingOptIn,
  clickedOptIn,
  textColor,
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
      <TextContent styles={{ textColor: `${textColor}` }}>
        {affiliateOptInContent}
      </TextContent>
    </label>
  </div>
);

AffiliateOptInToggle.propTypes = {
  clickedOptIn: PropTypes.func.isRequired,
  affiliateMessagingOptIn: PropTypes.bool.isRequired,
  affiliateOptInContent: PropTypes.object.isRequired,
  textColor: PropTypes.string,
};

AffiliateOptInToggle.defaultProps = { textColor: '#222' };

export default AffiliateOptInToggle;
