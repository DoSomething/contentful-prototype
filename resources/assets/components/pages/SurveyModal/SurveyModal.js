/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import { makeUrl } from '../../../helpers';

class SurveyModal extends React.Component {
  componentDidMount() {
    window.typeformInit();
  }

  render() {
    const { campaignId, northstarId, typeformUrl } = this.props;

    const typeformQuery = {
      northstar_id: northstarId,
      campaign_id: campaignId,
      origin: window.location.pathname,
    };

    const url = makeUrl(typeformUrl, typeformQuery);

    return (
      <div
        className="modal__slide typeform-widget"
        data-url={url.href}
        style={{ width: '100%', height: '500px' }}
      />
    );
  }
}

SurveyModal.propTypes = {
  typeformUrl: PropTypes.string.isRequired,
  northstarId: PropTypes.string,
  campaignId: PropTypes.string,
};

SurveyModal.defaultProps = {
  northstarId: null,
  campaignId: null,
};

export default SurveyModal;
