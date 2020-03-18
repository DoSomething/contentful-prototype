import React from 'react';
import PropTypes from 'prop-types';

import EmailSubscriptions from './EmailSubscriptions';

const Subscriptions = props => (
  <div className="grid-wide">
    <div className="pb-4">
      <h2 className="text-lg">Email Subscriptions</h2>
    </div>

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
