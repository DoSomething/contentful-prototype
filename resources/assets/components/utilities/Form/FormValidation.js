import React from 'react';

import { getFieldErrorMessages, getStatusMessage } from '../../../helpers/forms';

const FormValidation = ({ data }) => {
  const statusMessage = getStatusMessage(data);

  const errorMessages = getFieldErrorMessages(data);

  return (
    <article className="form-validation">
      <h1>{statusMessage}</h1>
      { errorMessages ?
        errorMessages.map(error => <li>{error}</li>)
        :
        null
      }
    </article>
  );
};

export default FormValidation;
