import React from 'react';
import PropTypes from 'prop-types';

import TextContent from '../utilities/TextContent/TextContent';

import './affiliateOption.scss';

const AffiliateOption = ({
  affiliateOptInContent,
  affiliateMessagingOptIn,
  clickedOptIn,
}) => (
  <div className="form-wrapper affiliate-option clear-both padding-top-md">
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

AffiliateOption.propTypes = {
  clickedOptIn: PropTypes.func.isRequired,
  affiliateMessagingOptIn: PropTypes.bool.isRequired,
  affiliateOptInContent: PropTypes.object.isRequired,
};

export default AffiliateOption;
