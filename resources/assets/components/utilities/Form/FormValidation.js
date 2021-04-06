import React from 'react';
import { has } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  getFieldErrorMessages,
  getStatusMessage,
} from '../../../helpers/forms';
import { HELP_LINK } from '../../../constants';

import './form-validation.scss';

const FormValidation = ({ response }) => {
  const hasErrors = has(response.status, 'error');
  const statusMessage = getStatusMessage(response);
  const errorMessages = getFieldErrorMessages(response);

  const renderErrorMessage = errorMessage => {
    // @HACK: We render a link to the Help Center along with file dimension validation errors.
    // Can we somehow formalize this better?
    if (errorMessage.includes('Photos must be no larger than')) {
      return (
        <>
          {errorMessage}{' '}
          <a
            data-testid="photo-dimensions-help-center-link"
            className="text-red-500 hover:text-red-300 hover:underline"
            href={`${HELP_LINK}/articles/360063589773`}
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
