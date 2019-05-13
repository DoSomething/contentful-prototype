import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Button from '../../utilities/Button/Button';
import EmailSubscriptionCheckbox from './EmailSubscriptionCheckbox';

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

class EmailSubscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSubscriptionTopics: this.props.user.emailSubscriptionTopics
        ? this.props.user.emailSubscriptionTopics
        : [],
      showAffirmation: false,
    };

    this.handleTopicChange = this.handleTopicChange.bind(this);
  }

  handleTopicChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState(state => {
      const newTopics = state.emailSubscriptionTopics;

      if (target.checked) {
        newTopics.push(name);
      } else {
        newTopics.splice(newTopics.indexOf(name), 1);
      }

      return {
        emailSubscriptionTopics: newTopics,
        showAffirmation: false,
      };
    });
  }

  render() {
    return (
      <Mutation mutation={EMAIL_SUBSCRIPTIONS_MUTATION}>
        {emailSubscriptionsMutation => (
          <form
            onSubmit={event => {
              event.preventDefault();
              emailSubscriptionsMutation({
                variables: {
                  userId: this.props.user.id,
                  emailSubscriptionTopics: this.state.emailSubscriptionTopics,
                },
              });
              this.setState({
                showAffirmation: true,
              });
            }}
          >
            {this.state.showAffirmation ? (
              <p className="padded affirmation-message">
                Your subscriptions have been updated!
              </p>
            ) : null}
            <div className="padded">
              <div className="form-wrapper clear-both">
                <EmailSubscriptionCheckbox
                  identifier="COMMUNITY"
                  title="Community"
                  description="A roundup of photos, writing, and stories of impact from the DoSomething community and members like you."
                  userTopics={this.state.emailSubscriptionTopics}
                  onChange={this.handleTopicChange}
                />
                <EmailSubscriptionCheckbox
                  identifier="NEWS"
                  title="News"
                  description="Don’t just read the news…*change* the news. Our current events newsletter has headlines, along with immediate ways to impact them."
                  userTopics={this.state.emailSubscriptionTopics}
                  onChange={this.handleTopicChange}
                />
                <EmailSubscriptionCheckbox
                  identifier="LIFESTYLE"
                  title="Lifestyle"
                  description="Stories of incredible young people, actionable how-tos, inspirational playlists, and other content to live your best life and help others do the same."
                  userTopics={this.state.emailSubscriptionTopics}
                  onChange={this.handleTopicChange}
                />
                <EmailSubscriptionCheckbox
                  identifier="SCHOLARSHIPS"
                  title="Scholarships"
                  description="Alerts on new ways to earn scholarships by doing social
                      good, plus announcements of scholarship winners."
                  userTopics={this.state.emailSubscriptionTopics}
                  onChange={this.handleTopicChange}
                />
              </div>
            </div>

            <Button type="submit" attached>
              Save subscriptions
            </Button>
          </form>
        )}
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
