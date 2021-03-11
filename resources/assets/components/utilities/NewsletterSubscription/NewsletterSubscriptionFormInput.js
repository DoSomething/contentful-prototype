import React from 'react';
import PropTypes from 'prop-types';

import { NEWSLETTER_TOPICS } from './config';
import { isAuthenticated } from '../../../helpers/auth';
import ToggleSubscriptionButton from './ToggleSubscriptionButton';
import ToggleSubscriptionCheckbox from './ToggleSubscriptionCheckbox';

const NewsLetterSubscriptionFormInput = ({ topic, updateSubscriptions }) =>
  isAuthenticated() ? (
    <ToggleSubscriptionButton topic={topic} />
  ) : (
    <ToggleSubscriptionCheckbox
      topic={topic}
      updateSubscriptions={updateSubscriptions}
    />
  );

NewsLetterSubscriptionFormInput.propTypes = {
  topic: PropTypes.oneOf(Object.keys(NEWSLETTER_TOPICS)).isRequired,
  updateSubscriptions: PropTypes.func.isRequired,
};

export default NewsLetterSubscriptionFormInput;
