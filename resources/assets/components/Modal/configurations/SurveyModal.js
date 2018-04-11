/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import { set } from '../../../helpers/storage';
import { makeUrl } from '../../../helpers';

const SURVEY_DATA_URL = 'https://dosomething.typeform.com/to/Bvcwvm';

class SurveyModal extends React.Component {
  componentDidMount() {
    window.typeformInit();
  }

  componentWillUnmount() {
    // @see: ModalLauncher.js
    set(
      `${this.props.northstarId}_dismissed_nps_survey`,
      'timestamp',
      Date.now(),
    );
  }

  render() {
    const { northstarId, campaignId, legacyCampaignId } = this.props;

    const typeformQuery = {
      northstar_id: northstarId,
      campaign_id: campaignId,
      legacy_campaign_id: legacyCampaignId,
      origin: window.location.pathname,
    };

    const typeformUrl = makeUrl(SURVEY_DATA_URL, typeformQuery);

    return (
      <div
        className="modal__slide typeform-widget"
        data-url={typeformUrl.href}
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
