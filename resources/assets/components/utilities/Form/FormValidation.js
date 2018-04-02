import React from 'react';
import { has } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getFieldErrorMessages, getStatusMessage } from '../../../helpers/forms';

import './form-validation.scss';

const FormValidation = ({ response }) => {
  const hasErrors = has(response.status, 'error');
  const statusMessage = getStatusMessage(response);
  const errorMessages = getFieldErrorMessages(response);

  return (
    <section className={classnames('form-validation padding-md', { '-error': hasErrors, '-success': ! hasErrors })}>
      <h1 className="visually-hidden">Form validaton information</h1>

      <p className="margin-bottom-sm font-bold">{statusMessage}</p>

      { errorMessages ?
        <ul className="list -compacted margin-top-sm">
          { errorMessages.map((error, index) => (
            <li key={`error-message-${index}`}>{error}</li> // eslint-disable-line react/no-array-index-key
          ))}
        </ul>
        :
        null
      }
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
