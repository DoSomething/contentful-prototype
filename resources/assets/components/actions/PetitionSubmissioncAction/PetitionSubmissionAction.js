import React from 'react';
import gql from 'graphql-tag';
import { get, has } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query as ApolloQuery } from 'react-apollo';
import { PuckWaypoint } from '@dosomething/puck-client';

import Card from '../../utilities/Card/Card';
import Button from '../../utilities/Button/Button';
import PostCreatedModal from '../PostCreatedModal';
import ActionInformation from '../ActionInformation';
import FormValidation from '../../utilities/Form/FormValidation';
import TextContent from '../../utilities/TextContent/TextContent';
import { formatPostPayload, getFieldErrors } from '../../../helpers/forms';
import CharacterLimit from '../../utilities/CharacterLimit/CharacterLimit';
import PrivacyLanguage from '../../utilities/PrivacyLanguage/PrivacyLanguage';

import './petition-submission-action.scss';

export const PetitionSubmissionBlockFragment = gql`
  fragment PetitionSubmissionBlockFragment on PetitionSubmissionBlock {
    actionId
    title
    content
    textFieldPlaceholder
    buttonText
    informationTitle
    informationContent
    affirmationContent
  }
`;

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

    const { actionId, id, pageId, storePost } = this.props;

    // Reset any straggling post submission data for this action.
    this.props.resetPostSubmissionItem(id);

    const type = 'text';

    // Send request to store the petition submission post.
    storePost({
      actionId,
      blockId: id,
      body: formatPostPayload({
        action_id: actionId,
        text: this.state.textValue,
        type,
      }),
      pageId,
      type,
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
            'petition-submission-action mb-6',
            this.props.className,
          )}
          id={id}
        >
          <PuckWaypoint
            name="petition_submission_action-top"
            waypointData={{ blockId: id }}
          />
          <ApolloQuery
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
                    <p className="p-3 affirmation-message">
                      Thanks for signing the petition!
                    </p>
                  ) : null}

                  {formResponse ? (
                    <FormValidation response={formResponse} />
                  ) : null}
                  <TextContent className="p-3">{content}</TextContent>

                  <form onSubmit={this.handleSubmit}>
                    <div className="p-3">
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
                      <div className="p-3">
                        <p className="petition-signature-label pb-2">Signed,</p>
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
                    <PrivacyLanguage />
                  </form>
                </Card>
              );
            }}
          </ApolloQuery>
          <PuckWaypoint
            name="petition_submission_action-bottom"
            waypointData={{ blockId: id }}
          />
        </div>

        {this.props.informationContent ? (
          <ActionInformation
            className={classnames(
              'petition-submission-information',
              this.props.className,
            )}
            title={informationTitle}
            content={informationContent}
          />
        ) : null}

        {this.state.showModal ? (
          <PostCreatedModal
            affirmationContent={this.props.affirmationContent}
            onClose={() => this.setState({ showModal: false })}
            title="We got your signature!"
            userId={this.props.userId}
          />
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
  id: PropTypes.string.isRequired, // @TODO: rename property to blockId
  informationContent: PropTypes.string,
  informationTitle: PropTypes.string,
  pageId: PropTypes.string.isRequired,
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
