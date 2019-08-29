import React from 'react';
import PropTypes from 'prop-types';

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
      <div>
        <h3>Benefits With Friends</h3>
        <p>
          Refer a friend to this campaign, and you’ll *both* earn a $5 gift
          card!
        </p>
        <button
          className="button padded"
          type="button"
          onClick={this.redirectToReferralPage}
        >
          Refer A Friend
        </button>
      </div>
    );
  }
}

CtaReferralPageBanner.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

export default CtaReferralPageBanner;
