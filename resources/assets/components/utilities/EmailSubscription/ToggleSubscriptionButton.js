import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { get, upperCase } from 'lodash';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { getUserId } from '../../../helpers/auth';
import ToggleButton from '../Button/ToggleButton';
import { EMAIL_SUBSCRIPTION_TOPICS } from './config';

export const EMAIL_SUBSCRIPTION_QUERY = gql`
  query EmailSubscriptionsQuery($userId: String!) {
    user(id: $userId) {
      id
      emailSubscriptionTopics
    }
  }
`;

export const EMAIL_SUBSCRIPTION_MUTATION = gql`
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

const ToggleSubscriptionButton = ({ attributes, topic }) => {
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
      activateText="Subscribe"
      attributes={attributes}
      className="mt-4"
      deactivateText="Unsubscribe"
      isDisabled={loading || modifying}
      isLoading={loading || modifying}
      isToggled={topics.includes(selectedTopic)}
      onClick={() => {
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
  attributes: PropTypes.object,
  topic: PropTypes.oneOf(Object.keys(EMAIL_SUBSCRIPTION_TOPICS)).isRequired,
};

ToggleSubscriptionButton.defaultProps = {
  attributes: null,
};

export default ToggleSubscriptionButton;
