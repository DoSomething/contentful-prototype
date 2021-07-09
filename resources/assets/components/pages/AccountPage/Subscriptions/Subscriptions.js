import React from 'react';
import PropTypes from 'prop-types';

import CancelEmailSubscription from './CancelEmailSubscription';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import EmailSubscriptionForm from '../../../utilities/EmailSubscription/EmailSubscriptionForm';

const Subscriptions = props => (
  <div className="grid-wide">
    <SectionHeader title="Email Subscriptions" />

    <p>
      Our newsletters can help you stay informed, stay entertained, and even
      help you win scholarships.
    </p>

    <EmailSubscriptionForm className="my-6" />

    <CancelEmailSubscription {...props} />
  </div>
);

Subscriptions.propTypes = {
  user: PropTypes.shape({
    emailSubscriptionTopics: PropTypes.arrayOf(PropTypes.string),
    userId: PropTypes.string,
  }).isRequired,
};

export default Subscriptions;
