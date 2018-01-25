import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { has } from 'lodash';
import { makeHash, modifiers } from '../../helpers';

import './form-message.scss';

const renderMessage = message => (
  <p>{message}</p>
);

const renderValidationMessage = error => (
  <article>
    <h1 className="title">Hmm, there were some issues with your submission.</h1>
    <ul className="list -compacted">
      {Object.keys(error.fields || {}).map(field => (
        error.fields[field].map(message => (
          <li key={makeHash(message)}>{message}</li>
        ))
      ))}
    </ul>
  </article>
);

const FormMessage = ({ messaging }) => {
  let message;
  let modifierClasses;

  // Error
  if (has(messaging, 'error')) {
    modifierClasses = 'error';

    // Validation Error
    // @TODO: maybe use a switch statement here, or maybe not refer
    // to the error code, and instead just check if the fields list
    // has items. Something to debate in the future.
    if (messaging.error.code === 422) {
      message = renderValidationMessage(messaging.error);
    } else {
      message = renderMessage(messaging.error.message);
    }
  }

  // Success
  if (has(messaging, 'success')) {
    modifierClasses = 'success';

    message = renderMessage(messaging.success.message);
  }

  if (message) {
    return <div className={classnames('form-message', modifiers(modifierClasses))}>{message}</div>;
  }

  return null;
};

FormMessage.propTypes = {
  messaging: PropTypes.objectOf(PropTypes.object),
};

FormMessage.defaultProps = {
  messaging: null,
};

export default FormMessage;
