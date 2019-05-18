/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import { makeUrl, withoutNulls } from '../../../helpers';

class SurveyModal extends React.Component {
  componentDidMount() {
    window.typeformInit();
  }

  render() {
    const { typeformUrl, queryParameters } = this.props;

    const typeformQuery = {
      redirect_pathname: window.location.href,
      ...queryParameters,
    };

    const url = makeUrl(typeformUrl, withoutNulls(typeformQuery));

    return (
      <div
        className=" typeform-widget"
        data-url={url.href}
        style={{ width: '100%', height: '500px' }}
      />
    );
  }
}

SurveyModal.propTypes = {
  queryParameters: PropTypes.object,
  typeformUrl: PropTypes.string.isRequired,
};

SurveyModal.defaultProps = {
  queryParameters: {},
};

export default SurveyModal;
