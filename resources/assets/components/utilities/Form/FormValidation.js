import React from 'react';
import { has } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  getFieldErrorMessages,
  getStatusMessage,
} from '../../../helpers/forms';

import './form-validation.scss';

const FormValidation = ({ response }) => {
  const hasErrors = has(response.status, 'error');
  const statusMessage = getStatusMessage(response);
  const errorMessages = getFieldErrorMessages(response);

  const renderErrorMessage = errorMessage => {
    // @HACK: We render a link to the Help Center along with a customized validation message
    // for file dimension errors. Can we somehow formalize this?
    if (errorMessage === 'The file has invalid image dimensions.') {
      return (
        <>
          Photos must be no larger than 10MB, at least 50 x 50, and no larger
          than 5000 x 4000. Try cropping your photo.{' '}
          <a
            data-testid="photo-dimensions-help-center-link"
            className="text-red-500 hover:text-red-300 hover:underline"
            href="https://help.dosomething.org/hc/en-us/articles/360063589773"
            target="_blank"
            rel="noreferrer"
          >
            View image resizing guide
          </a>
        </>
      );
    }

    return errorMessage;
  };

  return (
    <section
      className={classnames('form-validation p-3', {
        '-error': hasErrors,
        '-success': !hasErrors,
      })}
    >
      <h1 className="visually-hidden">Form validaton information</h1>

      <p className="mb-2 font-bold">{statusMessage}</p>

      {errorMessages ? (
        <ul className="list -compacted mt-2">
          {errorMessages.map((error, index) => (
            <li key={`error-message-${index}`}>{renderErrorMessage(error)}</li> // eslint-disable-line react/no-array-index-key
          ))}
        </ul>
      ) : null}
    </section>
  );
};

FormValidation.propTypes = {
  response: PropTypes.shape({
    data: PropTypes.object,
    status: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default FormValidation;
