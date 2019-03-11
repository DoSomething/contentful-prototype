import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// import FormItem from './FormItem';
import Button from '../../utilities/Button/Button';
// import VoterRegStatusBlock from './VoterRegStatusBlock';

const EMAIL_SUBSCRIPTIONS_MUTATION = gql`
  mutation EmailSubscriptionsMutation(
    $userId: String!
    $emailSubscriptionTopics: [EmailSubscriptionTopic]
  ) {
    user(id: $userId, emailSubscriptionTopics: $emailSubscriptionTopics) {
      emailSubscriptionTopics
    }
  }
`;

const EmailSubscriptions = props => (
  <Mutation mutation={EMAIL_SUBSCRIPTIONS_MUTATION}>
    {emailSubscriptionsMutation => {
      const shutUp = 'face';
      return (
        <form
          onSubmit={event => {
            event.preventDefault();
            emailSubscriptionsMutation({
              variables: {
                userId: props.user.userId,
                emailSubscriptionTopics: null,
              },
            });
          }}
        >
          <div className="padded">
            <div className="form-wrapper affiliate-option clear-both">
              <label className="option -checkbox" htmlFor="email_topics">
                <input
                  type="checkbox"
                  id="opt_in"
                  name="email_topics"
                  value="news"
                  defaultChecked={props.user.emailSubscriptionTopics.includes(
                    'NEWS',
                  )}
                  className="form-checkbox"
                />
                <span className="option__indicator" />
                NEWS
              </label>
            </div>
          </div>

          <Button type="submit" attached>
            Save subscriptions {shutUp}
          </Button>
        </form>
      );
    }}
  </Mutation>
);

EmailSubscriptions.propTypes = {
  user: PropTypes.shape({
    emailSubscriptionTopics: PropTypes.array,
    userId: PropTypes.string,
  }).isRequired,
};

export default EmailSubscriptions;
