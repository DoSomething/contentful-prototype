import React from 'react';
import PropTypes from 'prop-types';

import Card from '../utilities/Card/Card';
import Modal from '../utilities/Modal/Modal';
import AffiliateCredits from '../utilities/AffiliateCredits/AffiliateCredits';

class CampaignInfoBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    const {
      affiliateCreditText,
      affiliateSponsors,
      affiliatePartners,
      contactEmail,
    } = this.props;

    return (
      <div className="info-bar">
        <div className="default-container padding-vertical-lg padding-horizontal-md">
          <AffiliateCredits
            affiliateCreditText={affiliateCreditText}
            affiliateSponsors={affiliateSponsors}
            affiliatePartners={affiliatePartners}
          />

          <div className="info-bar__secondary">
            Questions?{' '}
            <button
              type="button"
              className="button -tertiary"
              style={{ color: 'white' }}
              onClick={() => this.setState({ showModal: true })}
            >
              Contact {contactEmail}
            </button>
          </div>

          {this.state.showModal ? (
            <Modal onClose={() => this.setState({ showModal: false })}>
              <Card title="Test" className="rounded bordered">
                Hi!
              </Card>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

CampaignInfoBar.propTypes = {
  affiliateCreditText: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliatePartners: PropTypes.arrayOf(PropTypes.object),
  contactEmail: PropTypes.string,
};

CampaignInfoBar.defaultProps = {
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  affiliatePartners: [],
  contactEmail: 'help@dosomething.org',
};

export default CampaignInfoBar;
