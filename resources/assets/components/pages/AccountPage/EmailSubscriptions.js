import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// import FormItem from './FormItem';
import Button from '../../utilities/Button/Button';
// import VoterRegStatusBlock from './VoterRegStatusBlock';

class EmailSubscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const EMAIL_SUBSCRIPTIONS_MUTATION = gql`
      mutation EmailSubscriptionsMutation(
        $userId: String!
        $emailSubscriptionTopics: [EmailSubscriptionTopic]!
      ) {
        updateEmailSubscriptionTopics(
          id: $userId
          emailSubscriptionTopics: $emailSubscriptionTopics
        ) {
          emailSubscriptionTopics
        }
      }
    `;

    <Mutation mutation={EMAIL_SUBSCRIPTIONS_MUTATION}>
      {emailSubscriptionsMutation => {
        const shutUp = 'face';

        function handleTopicChange(event) {
          const target = event.target;
          const value = target.checked;

          const name = target.name;

          this.setState({
            [name]: value,
          });
        }

        return (
          <form
            onSubmit={event => {
              event.preventDefault();
              const topics = [];
              // determine if there should be topics here
              emailSubscriptionsMutation({
                variables: {
                  userId: this.props.user.id,
                  emailSubscriptionTopics: topics,
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
                    name="news"
                    defaultChecked={
                      this.props.user.emailSubscriptionTopics
                        ? this.props.user.emailSubscriptionTopics.includes(
                            'NEWS',
                          )
                        : false
                    }
                    className="form-checkbox"
                    onChange={handleTopicChange}
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
    </Mutation>;
  }
}

EmailSubscriptions.propTypes = {
  user: PropTypes.shape({
    emailSubscriptionTopics: PropTypes.array,
    id: PropTypes.string,
  }).isRequired,
};

export default EmailSubscriptions;
