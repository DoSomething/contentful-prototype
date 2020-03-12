import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

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

const EmailSubscriptionToggle = ({ identifier, name, description }) => {
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
      <div className="bg-gray-400" style={{ height: '150px', width: '100%' }}>
        {' '}
      </div>
      <div className="p-4">
        <h3 className="text-base">{name}</h3>
        <p className="pb-4">{description}</p>
        <button
          type="button"
          className={classnames(
            'button -attached bg-blurple-500 hover:bg-blurple-300',
            {
              'is-loading': modifying,
            },
          )}
          onClick={() =>
            updateSubscription({
              variables: {
                topic: identifier,
                subscribed: !topics.includes(identifier),
              },
            })
          }
        >
          {topics.includes(identifier) ? 'unsubscribe' : 'gimme'}
        </button>
      </div>
    </div>
  );
};

EmailSubscriptionToggle.propTypes = {
  identifier: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const EmailSubscriptions = () => (
  <div className="gallery-grid gallery-grid-quartet">
    <EmailSubscriptionToggle
      identifier="COMMUNITY"
      name="What You're Doing"
      description="A roundup of photos, writing, and stories of impact from the DoSomething community and members like you."
    />
    <EmailSubscriptionToggle
      identifier="NEWS"
      name="The Breakdown"
      description="Don’t just read the news…*change* the news. Our current events newsletter has headlines, along with immediate ways to impact them."
    />
    <EmailSubscriptionToggle
      identifier="LIFESTYLE"
      name="The Boost"
      description="Stories of incredible young people, actionable how-tos, inspirational playlists, and other content to live your best life and help others do the same."
    />
    <EmailSubscriptionToggle
      identifier="SCHOLARSHIPS"
      name="Pays to Do Good"
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

// <Mutation mutation={EMAIL_SUBSCRIPTIONS_MUTATION}>
//   {emailSubscriptionsMutation => (
//     <form
//       className="pb-6"
//       onSubmit={event => {
//         event.preventDefault();
//         emailSubscriptionsMutation({
//           variables: {
//             userId: this.props.user.id,
//             emailSubscriptionTopics: this.state.emailSubscriptionTopics,
//           },
//         });
//         this.setState({
//           showAffirmation: true,
//         });
//       }}
//     >
//       {this.state.showAffirmation ? (
//         <p className="color-success">
//           Your subscriptions have been updated!
//         </p>
//       ) : null}
//       <div className="form-wrapper">
//         <EmailSubscriptionCheckbox
//           identifier="COMMUNITY"
//           title="Community"
//           description="A roundup of photos, writing, and stories of impact from the DoSomething community and members like you."
//           userTopics={this.state.emailSubscriptionTopics}
//           onChange={this.handleTopicChange}
//         />
//         <EmailSubscriptionCheckbox
//           identifier="NEWS"
//           title="News"
//           description="Don’t just read the news…*change* the news. Our current events newsletter has headlines, along with immediate ways to impact them."
//           userTopics={this.state.emailSubscriptionTopics}
//           onChange={this.handleTopicChange}
//         />
//         <EmailSubscriptionCheckbox
//           identifier="LIFESTYLE"
//           title="Lifestyle"
//           description="Stories of incredible young people, actionable how-tos, inspirational playlists, and other content to live your best life and help others do the same."
//           userTopics={this.state.emailSubscriptionTopics}
//           onChange={this.handleTopicChange}
//         />
//         <EmailSubscriptionCheckbox
//           identifier="SCHOLARSHIPS"
//           title="Scholarships"
//           description="Alerts on new ways to earn scholarships by doing social
//               good, plus announcements of scholarship winners."
//           userTopics={this.state.emailSubscriptionTopics}
//           onChange={this.handleTopicChange}
//         />
//       </div>

//       <Button type="submit">Save subscriptions</Button>
//     </form>
//   )}
// </Mutation>
