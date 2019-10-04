/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import * as typeformEmbed from '@typeform/embed';

import { appendToQuery, makeUrl, withoutNulls } from '../../../helpers';

const DISPLAY_STYLES = {
  block: {
    height: '815px',
    border: '1px #dcdcdc solid',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  modal: {
    height: '500px',
  },
};

class TypeFormEmbed extends React.Component {
  constructor(props) {
    super(props);

    this.typeformElement = React.createRef();
  }

  componentDidMount() {
    const { queryParameters, redirectParameters, typeformUrl } = this.props;

    const redirectUrl = appendToQuery(redirectParameters, window.location.href);

    const typeformQuery = {
      redirect_url: redirectUrl.href,
      ...queryParameters,
    };

    const url = makeUrl(typeformUrl, withoutNulls(typeformQuery));

    typeformEmbed.makeWidget(this.typeformElement.current, url.href, {});
  }

  render() {
    return (
      <div
        ref={this.typeformElement}
        style={{
          width: '100%',
          ...DISPLAY_STYLES[this.props.displayType],
        }}
      />
    );
  }
}

TypeFormEmbed.propTypes = {
  queryParameters: PropTypes.object,
  redirectParameters: PropTypes.object,
  typeformUrl: PropTypes.string.isRequired,
  displayType: PropTypes.oneOf(['block', 'modal']),
};

TypeFormEmbed.defaultProps = {
  queryParameters: {},
  redirectParameters: {},
  displayType: 'block',
};

export default TypeFormEmbed;
