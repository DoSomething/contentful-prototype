import React from 'react';
import PropTypes from 'prop-types';

import './cta-referral-page-banner.scss';

class CtaReferralPageBanner extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToReferralPage = this.redirectToReferralPage.bind(this);
  }

  redirectToReferralPage() {
    window.location.href = `/us/refer-friends?campaign_id=${this.props.campaignId}`;
  }

  render() {
    return (
      <div className="padding-top-md padding-bottom-md padding-horizontal-md">
        <div className="cta-register-banner padding-top-md padding-bottom-md padding-horizontal-md">
          <div>
            <h3>Benefits With Friends</h3>
            <p className="padding-bottom-md">
              Refer a friend to this campaign, and you’ll *both* earn a $5 gift
              card!
            </p>
            <button
              className="button padded share -blue"
              type="button"
              onClick={this.redirectToReferralPage}
            >
              Refer A Friend
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CtaReferralPageBanner.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

export default CtaReferralPageBanner;
