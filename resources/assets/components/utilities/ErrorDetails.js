import React from 'react';
import PropTypes from 'prop-types';

import { makeUrl } from '../../helpers/url';
import { HELP_REQUEST_LINK } from '../../constants';

const ErrorDetails = ({ error }) => {
  const context = `${+new Date()}, ID: ${window.AUTH ? window.AUTH.id : 'N/A'}`;

  let message = error;
  if (error instanceof Error) {
    const trace = error.stack.toString().split(/\r\n|\n/)[0];
    message = `${error.message} ${trace}`;
  }

  const technicalDetails = `${message}, ${context}`;

  return (
    <>
      <p className="text-sm text-gray-800 text-center m-0">
        If you continue to run into problems, contact our{' '}
        <a
          href={makeUrl(HELP_REQUEST_LINK, { technicalDetails })}
          className="font-semibold text-gray-800 hover:text-gray-600 underline"
        >
          support squad
        </a>
        !
      </p>
      {error ? (
        <p className="text-sm text-gray-500 text-center my-4 leading-normal">
          <strong>Technical Details:</strong> {technicalDetails}
        </p>
      ) : null}
    </>
  );
};

ErrorDetails.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

ErrorDetails.defaultProps = {
  error: 'Unknown Error',
};

export default ErrorDetails;
