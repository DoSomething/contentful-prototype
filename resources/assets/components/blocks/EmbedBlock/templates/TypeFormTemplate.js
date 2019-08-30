/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import { appendToQuery, makeUrl, withoutNulls } from '../../../../helpers';

class TypeFormTemplate extends React.Component {
  componentDidMount() {
    window.typeformInit();
  }

  render() {
    const { queryParameters, redirectParameters, typeformUrl } = this.props;

    const redirectUrl = appendToQuery(redirectParameters, window.location.href);

    const typeformQuery = {
      redirect_url: redirectUrl.href,
      ...queryParameters,
    };

    const url = makeUrl(typeformUrl, withoutNulls(typeformQuery));

    return (
      <div
        className="typeform-widget"
        data-url={url.href}
        style={{ width: '100%', height: '500px' }}
      />
    );
  }
}

TypeFormTemplate.propTypes = {
  queryParameters: PropTypes.object,
  redirectParameters: PropTypes.object,
  typeformUrl: PropTypes.string.isRequired,
};

TypeFormTemplate.defaultProps = {
  queryParameters: {},
  redirectParameters: {},
};

export default TypeFormTemplate;
