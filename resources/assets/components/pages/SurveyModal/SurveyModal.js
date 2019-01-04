/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import { makeUrl } from '../../../helpers';

const SURVEY_DATA_URL = 'https://dosomething.typeform.com/to/Bvcwvm';

class SurveyModal extends React.Component {
  componentDidMount() {
    window.typeformInit();
  }

  render() {
    const { northstarId, campaignId } = this.props;

    const typeformQuery = {
      northstar_id: northstarId,
      campaign_id: campaignId,
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
};

export default SurveyModal;
