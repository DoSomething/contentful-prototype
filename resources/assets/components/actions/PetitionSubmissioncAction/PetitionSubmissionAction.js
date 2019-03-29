import React from 'react';
import gql from 'graphql-tag';
import { get, has } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query } from 'react-apollo';
import { PuckWaypoint } from '@dosomething/puck-client';

import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import FormValidation from '../../utilities/Form/FormValidation';
import TextContent from '../../utilities/TextContent/TextContent';
import { formatFormFields, getFieldErrors } from '../../../helpers/forms';
import CharacterLimit from '../../utilities/CharacterLimit/CharacterLimit';

import './petition-submission-action.scss';

export const USER_POSTS_QUERY = gql`
  query UserPostsQuery($userId: String!, $actionIds: [Int]!) {
    posts(userId: $userId, actionIds: $actionIds) {
      text
    }
    user(id: $userId) {
      firstName
    }
  }
`;

const CHARACTER_LIMIT = 500;

class PetitionSubmissionAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      showModal: false,
      textValue: '',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const response = nextProps.submissions.items[nextProps.id] || null;

    if (has(response, 'status.success')) {
      // Resetting the submission item so that this won't be triggered continually for further renders.
      nextProps.resetPostSubmissionItem(nextProps.id);

      return {
        submitted: true,
        showModal: true,
        textValue: '',
      };
    }

    return null;
  }

  handleChange = event => this.setState({ textValue: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const { id, actionId, storePost } = this.props;

    // Reset any straggling post submission data for this action.
    this.props.resetPostSubmissionItem(id);

    const type = 'text';

    // Send request to store the petition submission post.
    storePost({
      body: formatFormFields({
        action_id: actionId,
        text: this.state.textValue,
        type,
      }),
      type,
      actionId,
      id,
    });
  };

  render() {
    const {
      actionId,
      buttonText,
      content,
      id,
      informationContent,
      informationTitle,
      submissions,
      title,
      textFieldPlaceholder,
      userId,
    } = this.props;

    const submissionItem = submissions.items[id];

    const formResponse = has(submissionItem, 'status') ? submissionItem : null;

    const formErrors = getFieldErrors(formResponse);

    return (
      <React.Fragment>
        <div
          className={classnames(
            'petition-submission-action margin-bottom-lg',
            this.props.className,
          )}
          id={id}
        >
          <PuckWaypoint
            name="petition_submission_action-top"
            waypointData={{ contentfulId: id }}
          />
          <Query
            query={USER_POSTS_QUERY}
            variables={{ userId, actionIds: [actionId] }}
            queryName="userPosts"
            skip={!userId}
          >
            {({ loading, data }) => {
              const signature = loading
                ? 'Loading name...'
                : get(data, 'user.firstName', 'A Doer');

              const post = get(data, 'posts', [])[0];
              const message = post && post.text;
              const submitted = Boolean(post || this.state.submitted);

              return (
                <Card className="bordered rounded" title={title}>
                  {submitted ? (
                    <p className="padded affirmation-message">
                      Thanks for signing the petition!
                    </p>
                  ) : null}

                  {formResponse ? (
                    <FormValidation response={formResponse} />
                  ) : null}
                  <TextContent className="padding-md">{content}</TextContent>

                  <form onSubmit={this.handleSubmit}>
                    <div className="padded">
                      <textarea
                        className={classnames('text-field petition-textarea', {
                          'has-error shake': has(formErrors, 'text'),
                        })}
                        placeholder={textFieldPlaceholder}
                        value={message || this.state.textValue}
                        onChange={this.handleChange}
                        disabled={submitted}
                      />
                      <CharacterLimit
                        limit={CHARACTER_LIMIT}
                        text={this.state.textValue}
                      />
                    </div>

                    {userId ? (
                      <div className="padded">
                        <p className="petition-signature-label padding-bottom-sm">
                          Signed,
                        </p>
                        <input
                          className="text-field petition-signature"
                          type="text"
                          disabled
                          value={signature}
                        />
                      </div>
                    ) : null}

                    <Button
                      type="submit"
                      attached
                      loading={submissionItem && submissionItem.isPending}
                      disabled={
                        submitted ||
                        this.state.textValue.length > CHARACTER_LIMIT
                      }
                    >
                      {buttonText}
                    </Button>
                  </form>
                </Card>
              );
            }}
          </Query>
          <PuckWaypoint
            name="petition_submission_action-bottom"
            waypointData={{ contentfulId: id }}
          />
        </div>

        {this.props.informationContent ? (
          <div
            className={classnames(
              'petition-submission-information',
              this.props.className,
            )}
          >
            <Card className="bordered rounded" title={informationTitle}>
              <TextContent className="padding-md">
                {informationContent}
              </TextContent>
            </Card>
          </div>
        ) : null}

        {this.state.showModal ? (
          <Modal onClose={() => this.setState({ showModal: false })}>
            <Card className="bordered rounded" title="We got your signature!">
              <TextContent className="padded">
                {this.props.affirmationContent}
              </TextContent>
            </Card>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

PetitionSubmissionAction.propTypes = {
  actionId: PropTypes.number.isRequired,
  affirmationContent: PropTypes.string,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  informationContent: PropTypes.string,
  informationTitle: PropTypes.string,
  resetPostSubmissionItem: PropTypes.func.isRequired,
  storePost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    items: PropTypes.object,
  }).isRequired,
  textFieldPlaceholder: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.string,
};

PetitionSubmissionAction.defaultProps = {
  affirmationContent: 'Thanks for signing the petition!',
  buttonText: 'Add your name',
  className: null,
  textFieldPlaceholder: 'Add your custom message...',
  title: 'Sign The Petition',
  informationContent:
    'Your first name and email will be added to our petition. We do not collect any additional information.',
  informationTitle: 'More Info',
  userId: null,
};

export default PetitionSubmissionAction;
