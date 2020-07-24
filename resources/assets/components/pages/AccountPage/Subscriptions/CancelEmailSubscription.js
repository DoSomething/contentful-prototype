import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Spinner from '../../../artifacts/Spinner/Spinner';

const EMAIL_SUBSCRIPTION_STATUS = gql`
  query EmailSubscriptionStatus($userId: String!) {
    user(id: $userId) {
      id
      emailSubscriptionStatus
    }
  }
`;
const EMAIL_SUBSCRIPTION_STATUS_MUTATION = gql`
  mutation EmailSubscriptionStatus(
    $userId: String!
    $emailSubscriptionStatus: Boolean!
  ) {
    updateEmailSubscriptionStatus(
      id: $userId
      emailSubscriptionStatus: $emailSubscriptionStatus
    ) {
      id
      emailSubscriptionStatus
      emailSubscriptionTopics
    }
  }
`;

const CancelEmailSubscription = props => {
  const userId = props.user.id;
  const options = { variables: { userId } };

  const { data, loading, error } = useQuery(EMAIL_SUBSCRIPTION_STATUS, options);
  const [updateEmailSubscriptionStatus] = useMutation(
    EMAIL_SUBSCRIPTION_STATUS_MUTATION,
    options,
  );

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (loading) {
    return <Spinner />;
  }

  const handleGlobalUnsubscribeClick = () => {
    trackAnalyticsEvent('clicked_link_action_global_email_unsubscribe', {
      action: 'link_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: 'global_email_unsubscribe',
      context: {},
    });
    updateEmailSubscriptionStatus({
      variables: {
        emailSubscriptionStatus: false,
      },
    });
  };

  return (
    <div>
      {data.user.emailSubscriptionStatus ? (
        <p>
          Need a break?
          <button
            className="px-1 text-blue-500 pb-4"
            type="button"
            onClick={handleGlobalUnsubscribeClick}
          >
            Unsubscribe
          </button>
          from all newsletters and account notification emails.
        </p>
      ) : null}
    </div>
  );
};

CancelEmailSubscription.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default CancelEmailSubscription;
