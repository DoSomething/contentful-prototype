import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Button from '../../utilities/Button/Button';

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
      newTopics.pop(name);
    }

    this.setState({
      emailSubscriptionTopics: newTopics,
      showAffirmation: false,
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
                <div className="padded">
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
                    {/* Workaround for this jsx-a11y bug https://git.io/fN814 */}
                    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                    <h4>Community</h4>
                    <p>
                      A roundup of writing, photos, and impact from the
                      DoSomething community, along with updates on DoSomething
                      staff, events, and office culture.
                    </p>
                  </label>
                </div>
                <div className="padded">
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
                    {/* Workaround for this jsx-a11y bug https://git.io/fN814 */}
                    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                    <h4>News</h4>
                    <p>
                      Read the news, change the news. A roundup of current
                      events, along with ways to take action and impact the
                      headlines.
                    </p>
                  </label>
                </div>
                <div className="padded">
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
                    {/* Workaround for this jsx-a11y bug https://git.io/fN814 */}
                    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                    <h4>Lifestyle</h4>
                    <p>
                      Advice, action guides, social change horoscopes,
                      inspirational playlists, recommendations, and other
                      content to live your best life and help others do the
                      same.
                    </p>
                  </label>
                </div>
                <div className="padded">
                  <label className="option -checkbox" htmlFor="email_topics">
                    <input
                      type="checkbox"
                      id="opt_in"
                      name="SCHOLARSHIPS"
                      title="Scholarships"
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
                    {/* Workaround for this jsx-a11y bug https://git.io/fN814 */}
                    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                    <h4>Scholarships</h4>
                    <p>
                      Alerts on new ways to earn scholarships by doing social
                      good, plus announcements of scholarship winners.
                    </p>
                  </label>
                </div>
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
