import React from 'react';
import PropTypes from 'prop-types';

import EmailSubscriptions from './EmailSubscriptions';

const Subscriptions = props => (
  <div className="bg-gray padding-bottom-lg wrapper">
    <h2 className="caps-lock league-gothic -sm">Your Email Subscriptions</h2>
    <EmailSubscriptions {...props} />
  </div>
);

Subscriptions.propTypes = {
  user: PropTypes.shape({
    emailSubscriptionTopics: PropTypes.array,
    userId: PropTypes.string,
  }).isRequired,
};

export default Subscriptions;
