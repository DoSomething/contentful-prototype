import React from 'react';
import PropTypes from 'prop-types';

import EmailSubscriptions from './EmailSubscriptions';

const Subscriptions = props => (
  <div className="grid-wide">
    <div className="pb-4">
      <h2 className="text-lg">Email Subscriptions</h2>
      <p>
        We tailor your emails and other communication based on your favorite
        cause areas.
      </p>
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
