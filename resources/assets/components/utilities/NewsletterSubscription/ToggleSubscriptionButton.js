import React from 'react';
import { get, upperCase } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { NEWSLETTER_TOPICS } from './config';
import { getUserId } from '../../../helpers/auth';
import ToggleButton from '../Button/ToggleButton';

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
      emailSubscriptionStatus
    }
  }
`;

const ToggleSubscriptionButton = ({ topic }) => {
  const selectedTopic = upperCase(topic);

  const options = { variables: { userId: getUserId() } };

  const { data, loading, error } = useQuery(EMAIL_SUBSCRIPTION_QUERY, options);

  const [updateSubscription, { loading: modifying }] = useMutation(
    EMAIL_SUBSCRIPTION_MUTATION,
    options,
  );

  if (error) {
    // @TODO: do something better here!
    return <p>bloop!</p>;
  }

  const topics = get(data, 'user.emailSubscriptionTopics', []);

  return (
    <ToggleButton
      className="mt-4"
      activateText="Subscribe"
      deactivateText="Unsubscribe"
      isDisabled={loading || modifying}
      isLoading={loading || modifying}
      isToggled={topics.includes(selectedTopic)}
      onClick={() => {
        console.log([topics, selectedTopic, !topics.includes(selectedTopic)]);

        updateSubscription({
          variables: {
            topic: selectedTopic,
            subscribed: !topics.includes(selectedTopic),
          },
        });
      }}
    />
  );
};

ToggleSubscriptionButton.propTypes = {
  topic: PropTypes.oneOf(Object.keys(NEWSLETTER_TOPICS)).isRequired,
};

ToggleSubscriptionButton.defaultProps = {};

export default ToggleSubscriptionButton;
