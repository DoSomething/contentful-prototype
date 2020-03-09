import React from 'react';
import PropTypes from 'prop-types';

import EmailSubscriptions from './EmailSubscriptions';

const Subscriptions = props => (
  <div className="grid-wide">
    <h2>Email Subscriptions</h2>
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
