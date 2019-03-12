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
    this.state = {
      emailSubscriptionTopics: this.props.user.emailSubscriptionTopics
        ? this.props.user.emailSubscriptionTopics
        : [],
    };

    this.handleTopicChange = this.handleTopicChange.bind(this);
  }

  handleTopicChange(event) {
    const target = event.target;
    const value = target.checked;

    const name = target.name;

    const newTopics = this.state.emailSubscriptionTopics;

    if (value) {
      newTopics.push(name);
    } else {
      newTopics.pop(name);
    }

    this.setState({
      emailSubscriptionTopics: newTopics,
    });
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

    return (
      <Mutation mutation={EMAIL_SUBSCRIPTIONS_MUTATION}>
        {emailSubscriptionsMutation => {
          return (
            <form
              onSubmit={event => {
                event.preventDefault();
                // determine if there should be topics here
                emailSubscriptionsMutation({
                  variables: {
                    userId: this.props.user.id,
                    emailSubscriptionTopics: this.state.emailSubscriptionTopics,
                  },
                });
              }}
            >
              <div className="padded">
                <div className="form-wrapper clear-both">
                  <label className="option -checkbox" htmlFor="email_topics">
                    <input
                      type="checkbox"
                      id="opt_in"
                      name="NEWS"
                      defaultChecked={
                        this.props.user.emailSubscriptionTopics
                          ? this.props.user.emailSubscriptionTopics.includes(
                              'NEWS',
                            )
                          : false
                      }
                      className="form-checkbox"
                      onChange={this.handleTopicChange}
                    />
                    <span className="option__indicator" />
                    NEWS
                  </label>

                  <label className="option -checkbox" htmlFor="email_topics">
                    <input
                      type="checkbox"
                      id="opt_in"
                      name="SCHOLARSHIPS"
                      defaultChecked={
                        this.props.user.emailSubscriptionTopics
                          ? this.props.user.emailSubscriptionTopics.includes(
                              'SCHOLARSHIPS',
                            )
                          : false
                      }
                      className="form-checkbox"
                      onChange={this.handleTopicChange}
                    />
                    <span className="option__indicator" />
                    SCHOLARSHIPS
                  </label>

                  <label className="option -checkbox" htmlFor="email_topics">
                    <input
                      type="checkbox"
                      id="opt_in"
                      name="ACTIONS"
                      defaultChecked={
                        this.props.user.emailSubscriptionTopics
                          ? this.props.user.emailSubscriptionTopics.includes(
                              'ACTIONS',
                            )
                          : false
                      }
                      className="form-checkbox"
                      onChange={this.handleTopicChange}
                    />
                    <span className="option__indicator" />
                    ACTIONS
                  </label>

                  <label className="option -checkbox" htmlFor="email_topics">
                    <input
                      type="checkbox"
                      id="opt_in"
                      name="LIFESTYLE"
                      defaultChecked={
                        this.props.user.emailSubscriptionTopics
                          ? this.props.user.emailSubscriptionTopics.includes(
                              'LIFESTYLE',
                            )
                          : false
                      }
                      className="form-checkbox"
                      onChange={this.handleTopicChange}
                    />
                    <span className="option__indicator" />
                    LIFESTYLE
                  </label>
                </div>
              </div>

              <Button type="submit" attached>
                Save subscriptions
              </Button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

EmailSubscriptions.propTypes = {
  user: PropTypes.shape({
    emailSubscriptionTopics: PropTypes.array,
    id: PropTypes.string,
  }).isRequired,
};

export default EmailSubscriptions;
