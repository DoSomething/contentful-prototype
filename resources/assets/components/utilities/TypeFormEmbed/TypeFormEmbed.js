/* global window */

import PropTypes from 'prop-types';
import * as typeformEmbed from '@typeform/embed';
import React, { useRef, useEffect } from 'react';

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

const TypeFormEmbed = ({
  displayType,
  queryParameters,
  redirectParameters,
  typeformUrl,
}) => {
  const typeformElement = useRef(null);

  const redirectUrl = appendToQuery(redirectParameters, window.location.href);

  const typeformQuery = {
    redirect_url: redirectUrl.href,
    ...queryParameters,
  };

  const url = makeUrl(typeformUrl, withoutNulls(typeformQuery));

  useEffect(() => {
    typeformEmbed.makeWidget(typeformElement.current, url.href, {});
  }, []);

  return (
    <div
      ref={typeformElement}
      style={{
        width: '100%',
        ...DISPLAY_STYLES[displayType],
      }}
    />
  );
};

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
