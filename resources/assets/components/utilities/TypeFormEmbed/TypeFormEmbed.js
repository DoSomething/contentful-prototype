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
  typeformUrl,
  onSubmit,
}) => {
  const typeformElement = useRef(null);

  const typeformQuery = {
    ...queryParameters,
  };

  const url = makeUrl(typeformUrl, withoutNulls(typeformQuery));

  useEffect(() => {
    typeformEmbed.makeWidget(
      typeformElement.current,
      url.href,
      withoutNulls({
        onSubmit,
      }),
    );
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
  typeformUrl: PropTypes.string.isRequired,
  displayType: PropTypes.oneOf(['block', 'modal']),
  onSubmit: PropTypes.func,
};

TypeFormEmbed.defaultProps = {
  queryParameters: {},
  displayType: 'block',
  onSubmit: null,
};

export default TypeFormEmbed;
