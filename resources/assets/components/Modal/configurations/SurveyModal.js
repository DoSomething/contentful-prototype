/* global window */

import React from 'react';
import PropTypes from 'prop-types';

const SURVEY_DATA_URL = 'https://dosomething.typeform.com/to/Bvcwvm';

class SurveyModal extends React.Component {
  componentDidMount() {
    window.typeformInit();
  }

  render() {
    const { dataUrl, northstarId, campaignId, legacyCampaignId } = this.props;

    return (
      <div
        className="modal__slide typeform-widget"
        data-url={`${dataUrl}?northstar_id=${northstarId}&campaign_id=${campaignId}&legacy_campaign_id=${legacyCampaignId}`}
        style={{ width: '100%', height: '500px' }}
      />
    );
  }
}

SurveyModal.propTypes = {
  dataUrl: PropTypes.string,
  northstarId: PropTypes.string,
  campaignId: PropTypes.string,
  legacyCampaignId: PropTypes.string,
};

SurveyModal.defaultProps = {
  dataUrl: SURVEY_DATA_URL,
  northstarId: null,
  campaignId: null,
  legacyCampaignId: null,
};

export default SurveyModal;
