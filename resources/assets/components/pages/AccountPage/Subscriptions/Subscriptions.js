import React from 'react';
import PropTypes from 'prop-types';

import EmailSubscriptions from './EmailSubscriptions';
import CancelEmailSubscription from './CancelEmailSubscription';

const Subscriptions = props => (
  <div className="grid-wide">
    <h1 className="text-xl">Email Subscriptions</h1>
    <p className="text-gray-600">
      Our newsletters can help you stay informed, stay entertained, and even
      help you win scholarships.
    </p>

    <EmailSubscriptions {...props} />
    <CancelEmailSubscription userId={props.user.userId} />
  </div>
);

Subscriptions.propTypes = {
  user: PropTypes.shape({
    emailSubscriptionTopics: PropTypes.array,
    userId: PropTypes.string,
  }).isRequired,
};

export default Subscriptions;
