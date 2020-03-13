import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import NewsletterImages from './NewsletterImages';

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

const EmailSubscriptionToggle = ({ identifier, name, image, description }) => {
  const options = { variables: { userId: window.AUTH.id } };

  // Make the initial query to get the user's subscriptions
  const { data, loading, error } = useQuery(EMAIL_SUBSCRIPTION_QUERY, options);
  const [updateSubscription, { loading: modifying }] = useMutation(
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
        <img
          className="pb-4"
          style={{ width: '100%' }}
          src={image}
          alt="newsletter"
        />
        <h3 className="text-base px-4">{name}</h3>
        <p className="pb-4 px-4 flex-grow">{description}</p>
        <button
          type="button"
          className={
            !topics.includes(identifier)
              ? 'btn mx-4 mb-4 bg-blurple-500 text-white border border-solid border-blurple-500 hover:bg-blurple-300'
              : 'btn mx-4 mb-4 bg-white border border-solid border-blurple-500 text-blurple-500 hover:border-blurple-300 hover:text-blurple-200'
          }
          onClick={() =>
            updateSubscription({
              variables: {
                topic: identifier,
                subscribed: !topics.includes(identifier),
              },
            })
          }
        >
          {topics.includes(identifier) ? 'Unsubscribe' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

EmailSubscriptionToggle.propTypes = {
  identifier: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const EmailSubscriptions = () => (
  <div className="gallery-grid gallery-grid-quartet">
    <EmailSubscriptionToggle
      identifier="COMMUNITY"
      name="What You're Doing"
      image={NewsletterImages.CommunityNewsletter}
      description="A roundup of photos, writing, and stories of impact from the DoSomething community and members like you."
    />
    <EmailSubscriptionToggle
      identifier="NEWS"
      name="The Breakdown"
      image={NewsletterImages.NewsNewsletter}
      description="Don’t just read the news…*change* the news. Our current events newsletter has headlines, along with immediate ways to impact them."
    />
    <EmailSubscriptionToggle
      identifier="LIFESTYLE"
      name="The Boost"
      image={NewsletterImages.LifestyleNewsletter}
      description="Stories of incredible young people, actionable how-tos, inspirational playlists, and other content to live your best life and help others do the same."
    />
    <EmailSubscriptionToggle
      identifier="SCHOLARSHIPS"
      name="Pays to Do Good"
      image={NewsletterImages.ScholarshipNewsletter}
      description="Alerts on new ways to earn scholarships by doing social good, plus announcements of scholarship winners."
    />
  </div>
);

EmailSubscriptions.propTypes = {
  user: PropTypes.shape({
    emailSubscriptionTopics: PropTypes.array,
    id: PropTypes.string,
  }).isRequired,
};

export default EmailSubscriptions;
