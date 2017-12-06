/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import { SURVEY_DATA_URL } from '../../../constants/nps_survey';

class SurveyModal extends React.Component {
  componentDidMount() {
    window.typeformInit();
  }

  render() {
    return (
      <div
        className="modal__slide typeform-widget"
        data-url={this.props.dataUrl}
        style={{ width: '100%', height: '500px' }}
      />
    );
  }
}

SurveyModal.propTypes = {
  dataUrl: PropTypes.string,
};

SurveyModal.defaultProps = {
  dataUrl: SURVEY_DATA_URL,
};

export default SurveyModal;
