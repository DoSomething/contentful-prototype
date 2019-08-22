import React from 'react';
import PropTypes from 'prop-types';

import Card from '../utilities/Card/Card';
import Modal from '../utilities/Modal/Modal';
import AffiliateCredits from '../utilities/AffiliateCredits/AffiliateCredits';
import './campaign-infobar.scss';

class CampaignInfoBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      textValue: '',
      showAffirmationModal: false,
    };
  }

  handleChange = event => {
    this.setState({
      textValue: event.target.value,
    });
  };

  handleClick = () => {
    const data = {
      request: {
        requester: {
          email: 'test@dosomething.org',
          name: 'test',
        },
        comment: {
          body: this.state.textValue,
        },
        subject: 'helpdesk',
      },
    };

    // Create a ticket in Zendesk:
    fetch(
      'https://dosomethingorg11412693296.zendesk.com/api/v2/requests.json',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(response => {
        this.setState({
          showModal: false,
          textValue: '',
          showAffirmationModal: true,
        });

        console.log('Success:', JSON.stringify(response));
      })
      .catch(error => console.error('Error:', error));
  };

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
              <Card title="Contact Us" className="rounded bordered">
                <div className="padded">
                  <div className="margin-bottom-md">
                    <p>
                      Need Help? Submit your question below, and we&apos;ll get
                      back to you as soon as possible!
                    </p>
                  </div>
                  <textarea
                    className="text-field"
                    id="text"
                    name="text"
                    placeholder="write your query here"
                    value={this.state.textValue}
                    onChange={this.handleChange}
                  />
                  <button
                    type="submit"
                    className="button"
                    value="Submit"
                    onClick={this.handleClick}
                  >
                    {' '}
                    Submit
                  </button>
                </div>
              </Card>
            </Modal>
          ) : null}

          {this.state.showAffirmationModal ? (
            <Modal
              onClose={() => this.setState({ showAffirmationModal: false })}
            >
              <Card title="Thank you" className="rounded bordered">
                <div className="padded">
                  <div className="margin-bottom-md">
                    <p>
                      Thank you for your query! We will get back to you as soon
                      as possible!
                    </p>
                  </div>
                </div>
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
