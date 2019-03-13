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

    const newTopics = this.state.emailSubscriptionTopics;

    if (target.checked) {
      newTopics.push(name);
    } else {
      newTopics.splice(newTopics.indexOf(name), 1);
    }

    this.setState({
      emailSubscriptionTopics: newTopics,
      showAffirmation: false,
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
                  identifier="ACTIONS"
                  title="Community"
                  description="A roundup of writing, photos, and impact from the DoSomething community,
        along with updates on DoSomething staff, events, and office culture."
                  userTopics={this.state.emailSubscriptionTopics}
                  onChange={this.handleTopicChange}
                />
                <EmailSubscriptionCheckbox
                  identifier="NEWS"
                  title="News"
                  description="Read the news, change the news. A roundup of current
                      events, along with ways to take action and impact the
                      headlines."
                  userTopics={this.state.emailSubscriptionTopics}
                  onChange={this.handleTopicChange}
                />
                <EmailSubscriptionCheckbox
                  identifier="LIFESTYLE"
                  title="Lifestyle"
                  description="Advice, action guides, social change horoscopes,
                      inspirational playlists, recommendations, and other
                      content to live your best life and help others do the
                      same."
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
