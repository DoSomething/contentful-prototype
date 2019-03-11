import React from 'react';
import PropTypes from 'prop-types';

// import FormItem from './FormItem';
// import VoterRegStatusBlock from './VoterRegStatusBlock';
import EmailSubscriptions from './EmailSubscriptions';

const Subscriptions = props => (
  <div className="bg-gray padding-bottom-lg wrapper">
    <h2 className="caps-lock league-gothic -sm">Your Email Subscriptions</h2>
    <div className="margin-top-lg float-left">
      <div className="margin-top-lg">
        <EmailSubscriptions {...props} />
      </div>
    </div>
  </div>
);

// Subscriptions.propTypes = {
//   emailSubscriptionTopics: PropTypes.shape({}).isRequired,
// };

Subscriptions.propTypes = {
  user: PropTypes.shape({
    emailSubscriptionTopics: PropTypes.array,
    userId: PropTypes.string,
  }).isRequired,
};

export default Subscriptions;
