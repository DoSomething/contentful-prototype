import React from 'react';
import PropTypes from 'prop-types';

import { EMAIL_SUBSCRIPTION_TOPICS } from './config';
import { isAuthenticated } from '../../../helpers/auth';
import ToggleSubscriptionButton from './ToggleSubscriptionButton';
import ToggleSubscriptionCheckbox from './ToggleSubscriptionCheckbox';

const EmailSubscriptionFormInput = ({ topic, updateSubscriptions }) =>
  isAuthenticated() ? (
    <ToggleSubscriptionButton topic={topic} />
  ) : (
    <ToggleSubscriptionCheckbox
      topic={topic}
      updateSubscriptions={updateSubscriptions}
    />
  );

EmailSubscriptionFormInput.propTypes = {
  topic: PropTypes.oneOf(Object.keys(EMAIL_SUBSCRIPTION_TOPICS)).isRequired,
  updateSubscriptions: PropTypes.func.isRequired,
};

export default EmailSubscriptionFormInput;
