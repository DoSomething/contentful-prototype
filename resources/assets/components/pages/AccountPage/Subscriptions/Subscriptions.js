import React from 'react';
import PropTypes from 'prop-types';

import CancelEmailSubscription from './CancelEmailSubscription';
import LegacyEmailSubscriptions from '../../../utilities/EmailSubscription/LegacyEmailSubscriptions';

const Subscriptions = props => (
  <div className="grid-wide">
    <h1 className="text-xl">Email Subscriptions</h1>

    <p className="text-gray-600">
      Our newsletters can help you stay informed, stay entertained, and even
      help you win scholarships.
    </p>

    <LegacyEmailSubscriptions {...props} />

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
