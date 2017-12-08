/* global window */

import React from 'react';
import PropTypes from 'prop-types';

const SURVEY_DATA_URL = 'https://dosomething.typeform.com/to/Bvcwvm';

class SurveyModal extends React.Component {
  componentDidMount() {
    window.typeformInit();
  }

  render() {
    const { northstarId, campaignId, legacyCampaignId } = this.props;

    return (
      <div
        className="modal__slide typeform-widget"
        data-url={`${SURVEY_DATA_URL}?northstar_id=${northstarId}&campaign_id=${campaignId}&legacy_campaign_id=${legacyCampaignId}`}
        style={{ width: '100%', height: '500px' }}
      />
    );
  }
}

SurveyModal.propTypes = {
  northstarId: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
};

export default SurveyModal;
