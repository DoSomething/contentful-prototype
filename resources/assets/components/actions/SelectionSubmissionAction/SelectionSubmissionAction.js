import React from 'react';
import gql from 'graphql-tag';
import { get, has } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Query } from 'react-apollo';

import Card from '../../utilities/Card/Card';
import Button from '../../utilities/Button/Button';
import FormValidation from '../../utilities/Form/FormValidation';
import TextContent from '../../utilities/TextContent/TextContent';
import { formatPostPayload, getFieldErrors } from '../../../helpers/forms';

import './selection-submission-action.scss';

const USER_POSTS_QUERY = gql`
  query UserPostsQuery($userId: String!, $actionIds: [Int]!) {
    posts(userId: $userId, actionIds: $actionIds) {
      text
    }
  }
`;

class SelectionSubmissionAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: this.props.selectionPlaceholderOption,
      submitted: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const response = nextProps.submissions.items[nextProps.id] || null;

    if (has(response, 'status.success')) {
      // Resetting the submission item so that this won't be triggered continually for further renders.
      nextProps.resetPostSubmissionItem(nextProps.id);

      return {
        submitted: true,
      };
    }

    return null;
  }

  // Is the current user selection one of the defined selection options?
  isSelectionValid = () =>
    this.props.selectionOptions.indexOf(this.state.selection) !== -1;

  handleChange = event => this.setState({ selection: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    // Run a validation as an edge case measure (e.g. to prevent submitting custom data via dom manipulation).
    if (!this.isSelectionValid()) {
      return;
    }

    const { actionId, campaignId, id, pageId, storePost } = this.props;

    // Reset any straggling post submission data for this action.
    this.props.resetPostSubmissionItem(id);

    const type = 'text';

    // Trigger request to store the selection submission post.
    storePost({
      actionId,
      blockId: id,
      body: formatPostPayload({
        action_id: actionId,
        text: this.state.selection,
        type,
      }),
      campaignId,
      pageId,
      type,
    });
  };

  render() {
    const {
      actionId,
      buttonText,
      id,
      title,
      content,
      postSubmissionLabel,
      selectionFieldLabel,
      selectionPlaceholderOption,
      selectionOptions,
      submissions,
      userId,
    } = this.props;

    const submissionItem = submissions.items[id];

    const formResponse = has(submissionItem, 'status') ? submissionItem : null;

    const formErrors = getFieldErrors(formResponse);

    const isSelectionInvalid = !this.isSelectionValid();

    return (
      <Card
        className="selection-submission-action bordered rounded"
        title={title}
      >
        {formResponse ? <FormValidation response={formResponse} /> : null}

        <TextContent className="p-3">{content}</TextContent>

        <Query
          query={USER_POSTS_QUERY}
          variables={{ userId, actionIds: [actionId] }}
        >
          {({ loading, data }) => {
            if (loading) {
              return <div className="spinner -centered margin-bottom-md" />;
            }

            const post = get(data, 'posts', [])[0];
            const selection = get(post, 'text');

            // If the user successfuly submitted the form, or a pre-existing submission is found,
            // display the post-submission state.
            if (selection || this.state.submitted) {
              return (
                <div className="pb-3 px-3">
                  <p className="submission-text caps-lock">
                    {selection || this.state.selection}
                  </p>
                  <p className="caps-lock color-gray font-bold margin-top-none">
                    {postSubmissionLabel}
                  </p>
                </div>
              );
            }

            return (
              <form onSubmit={this.handleSubmit}>
                <div className="px-3">
                  <label
                    className={classNames('field-label', {
                      'has-error': has(formErrors, 'text'),
                    })}
                    htmlFor="selections"
                  >
                    {selectionFieldLabel}
                  </label>
                  <div className="select">
                    <select
                      id="selections"
                      className={classNames('text-field', {
                        'color-gray': isSelectionInvalid,
                        'has-error shake': has(formErrors, 'text'),
                      })}
                      value={this.state.selection}
                      onChange={this.handleChange}
                    >
                      <option disabled>{selectionPlaceholderOption}</option>
                      {selectionOptions.map(selectionOption => (
                        <option key={selectionOption} value={selectionOption}>
                          {selectionOption}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  attached
                  disabled={isSelectionInvalid}
                  loading={submissionItem && submissionItem.isPending}
                >
                  {buttonText}
                </Button>
              </form>
            );
          }}
        </Query>
      </Card>
    );
  }
}

SelectionSubmissionAction.propTypes = {
  actionId: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired, // @TODO: rename property to blockId
  pageId: PropTypes.string.isRequired,
  postSubmissionLabel: PropTypes.string.isRequired,
  resetPostSubmissionItem: PropTypes.func.isRequired,
  selectionFieldLabel: PropTypes.string,
  selectionOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectionPlaceholderOption: PropTypes.string,
  storePost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    items: PropTypes.object,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  title: PropTypes.string,
};

SelectionSubmissionAction.defaultProps = {
  buttonText: 'Submit',
  selectionFieldLabel: 'Make your selection below',
  selectionPlaceholderOption: '---',
  title: 'Make a selection',
};

export default SelectionSubmissionAction;
