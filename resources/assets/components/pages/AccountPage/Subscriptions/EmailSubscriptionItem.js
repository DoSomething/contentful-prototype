import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import ToggleButton from '../../../utilities/Button/ToggleButton';

const EMAIL_SUBSCRIPTION_QUERY = gql`
  query EmailSubscriptionsQuery($userId: String!) {
    user(id: $userId) {
      id
      emailSubscriptionTopics
    }
  }
`;

const EMAIL_SUBSCRIPTION_MUTATION = gql`
  mutation EmailSubscriptionTopic(
    $userId: String!
    $topic: EmailSubscriptionTopic!
    $subscribed: Boolean!
  ) {
    updateEmailSubscriptionTopic(
      id: $userId
      topic: $topic
      subscribed: $subscribed
    ) {
      id
      emailSubscriptionTopics
    }
  }
`;
const EmailSubscriptionItem = ({ topic, name, image, description }) => {
  const options = { variables: { userId: window.AUTH.id } };

  // Make the initial query to get the user's subscriptions
  const { data, loading, error } = useQuery(EMAIL_SUBSCRIPTION_QUERY, options);
  const [updateSubscription] = useMutation(
    EMAIL_SUBSCRIPTION_MUTATION,
    options,
  );

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (loading) {
    return <div className="spinner" />;
  }

  const topics = data.user.emailSubscriptionTopics;

  return (
    <div className="card rounded border-solid border-2 border-gray-300">
      <div className="flex flex-col h-full">
        <img style={{ width: '100%' }} src={image} alt="newsletter" />

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-base">{name}</h3>

          <p className="flex-grow">{description}</p>

          <ToggleButton
            activateText="Subscribe"
            deactivateText="Unsubscribe"
            isToggled={topics.includes(topic)}
            className="mt-4"
            onClick={() =>
              updateSubscription({
                variables: {
                  topic,
                  subscribed: !topics.includes(topic),
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

EmailSubscriptionItem.propTypes = {
  topic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default EmailSubscriptionItem;
