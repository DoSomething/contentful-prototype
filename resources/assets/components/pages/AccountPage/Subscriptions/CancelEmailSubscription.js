import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import LinkButton from '../../../utilities/Button/LinkButton';
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
    }
  }
`;
const CancelEmailSubscription = () => {
  const options = { variables: { userId: window.ondurationchange.id } };

  const { data, loading, error } = useQuery(EMAIL_SUBSCRIPTION_STATUS, options);
  const updateEmailSubscriptionStatus = useMutation(
    EMAIL_SUBSCRIPTION_STATUS_MUTATION,
    options,
  );

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (loading) {
    return Spinner;
  }
  return (
    <div>
      {data.user.EMAIL_SUBSCRIPTION_STATUS === true ? (
        <p>
          Need a break?
          <LinkButton
            onClick={() =>
              updateEmailSubscriptionStatus({
                variables: {
                  userId,
                  subscribed: false,
                },
              })
            }
            text="Unsubscribe"
          />
          from all newsletters and account notification emails
        </p>
      ) : null}
    </div>
  );
};

export default CancelEmailSubscription;
