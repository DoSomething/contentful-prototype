import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, has, invert, mapValues } from 'lodash';

import PostForm from '../PostForm';
import Card from '../../utilities/Card/Card';
import { getUserId } from '../../../helpers/auth';
import { featureFlag } from '../../../helpers/env';
import PostCreatedModal from '../PostCreatedModal';
import ActionInformation from '../ActionInformation';
import FormValidation from '../../utilities/Form/FormValidation';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import { withoutUndefined, withoutNulls } from '../../../helpers';
import { getFieldErrors, formatPostPayload } from '../../../helpers/forms';
import CharacterLimit from '../../utilities/CharacterLimit/CharacterLimit';
import PrivacyLanguage from '../../utilities/PrivacyLanguage/PrivacyLanguage';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

import './text-submission-action.scss';

const CHARACTER_LIMIT = 500;

export const TextSubmissionBlockFragment = gql`
  fragment TextSubmissionBlockFragment on TextSubmissionBlock {
    actionId
    title
    textFieldLabel
    textFieldPlaceholder
    buttonText
    informationTitle
    informationContent
    affirmationContent
  }
`;

class TextSubmissionAction extends PostForm {
  static getDerivedStateFromProps(nextProps) {
    const response = nextProps.submissions.items[nextProps.id] || null;

    if (has(response, 'status.success')) {
      // Resetting the submission item so that this won't be triggered continually for further renders.
      nextProps.resetPostSubmissionItem(nextProps.id);

      // If the feature is toggled on, we'll redirect to the show submission page instead of displaying the affirmation modal.
      const redirectToSubmissionPage = featureFlag('post_confirmation_page');

      if (redirectToSubmissionPage) {
        // @TODO: Use <Redirect> once https://git.io/JL3Bc is resolved.
        window.location = `/us/posts/${response.data.id}?submissionActionId=${nextProps.id}`;
      }

      return {
        showModal: !redirectToSubmissionPage,
        textValue: '',
      };
    }

    return null;
  }

  fields = {
    text: 'text',
  };

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      textValue: '',
    };

    this.userId = getUserId();
  }

  handleChange = event => {
    this.setState({
      textValue: event.target.value,
    });
  };

  handleFocus = () => {
    trackAnalyticsEvent('focused_text_submission_action_text', {
      action: 'field_focused',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'text_submission_action',
      context: { blockId: this.props.id, pageId: this.props.pageId },
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.props.resetPostSubmissionItem(this.props.id);

    const type = 'text';

    const action = get(this.props.additionalContent, 'action', 'default');

    const formFields = withoutNulls({
      action, // @TODO: deprecate
      type,
      id: this.props.id, // @TODO: rename property to blockId?
      action_id: this.props.actionId,
      school_id: await this.getUserActionSchoolId(),
      // Associate state values to fields.
      ...mapValues(this.fields, value => this.state[`${value}Value`]),
    });

    const data = {
      action, // @TODO: deprecate
      actionId: this.props.actionId,
      blockId: this.props.id,
      body: formatPostPayload(formFields),
      campaignId: this.props.campaignId,
      pageId: this.props.pageId,
      type,
    };

    // Send request to store the text submission post.
    // (Use campaign ID independent post method if actionId is provided).
    if (this.props.actionId) {
      this.props.storePost(data);
    } else {
      this.props.storeCampaignPost(this.props.campaignId, data);
    }
  };

  render() {
    const context = {
      blockId: this.props.id,
      campaignId: this.props.campaignId,
      pageId: this.props.pageId,
    };

    const submissionItem = this.props.submissions.items[this.props.id];

    const formResponse = has(submissionItem, 'status') ? submissionItem : null;

    const formErrors = getFieldErrors(formResponse);

    // Associate errors to component field names.
    const errors = withoutUndefined(
      formErrors
        ? mapValues(invert(this.fields), value => formErrors[value])
        : null,
    );

    return (
      <>
        <div
          className={classnames(
            'text-submission-action mb-6',
            this.props.className,
          )}
          id={this.props.id}
        >
          <AnalyticsWaypoint
            name="text_submission_action-top"
            context={{ blockId: this.props.id }}
          />

          <Card className="bordered rounded" title={this.props.title}>
            <div className="p-3">
              {formResponse ? <FormValidation response={formResponse} /> : null}

              <form onSubmit={this.handleSubmit}>
                <label
                  className={classnames('field-label h-auto mb-2', {
                    'has-error': has(errors, 'text'),
                  })}
                  htmlFor="text"
                >
                  {this.props.textFieldLabel}
                </label>

                <textarea
                  className={classnames(
                    'block mb-2 text-field text-submission-texarea',
                    {
                      'has-error shake': has(errors, 'text'),
                    },
                  )}
                  id="text"
                  name="text"
                  placeholder={this.props.textFieldPlaceholder}
                  value={this.state.textValue}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                />

                <CharacterLimit
                  className="mb-3"
                  limit={CHARACTER_LIMIT}
                  text={this.state.textValue}
                />

                <PrimaryButton
                  className="block mt-6 text-lg w-full"
                  isDisabled={
                    !this.state.textValue ||
                    this.state.textValue.length > CHARACTER_LIMIT
                  }
                  isLoading={submissionItem && submissionItem.isPending}
                  text={this.props.buttonText}
                  type="submit"
                />

                <PrivacyLanguage className="mb-1 mt-5" />
              </form>
            </div>
          </Card>

          <AnalyticsWaypoint
            name="text_submission_action-bottom"
            context={{ blockId: this.props.id }}
          />
        </div>

        {this.props.informationContent ? (
          <ActionInformation
            className={classnames(
              'text-submission-information',
              this.props.className,
            )}
            title={this.props.informationTitle}
            content={this.props.informationContent}
          />
        ) : null}

        {this.state.showModal ? (
          <PostCreatedModal
            affirmationContent={this.props.affirmationContent}
            context={context}
            onClose={() => this.setState({ showModal: false })}
            title="We got your message!"
            userId={this.userId}
          />
        ) : null}
      </>
    );
  }
}

TextSubmissionAction.propTypes = {
  actionId: PropTypes.number,
  affirmationContent: PropTypes.string,
  additionalContent: PropTypes.shape({
    action: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  campaignId: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired, // @TODO: rename property to blockId
  informationTitle: PropTypes.string,
  informationContent: PropTypes.string,
  pageId: PropTypes.string,
  resetPostSubmissionItem: PropTypes.func.isRequired,
  storeCampaignPost: PropTypes.func.isRequired,
  storePost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    isPending: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  textFieldLabel: PropTypes.string,
  textFieldPlaceholder: PropTypes.string,
  title: PropTypes.string,
};

TextSubmissionAction.defaultProps = {
  actionId: null,
  additionalContent: null,
  affirmationContent:
    "Thanks for joining the movement, and submitting your message! After we review your submission, we'll add it to the public gallery alongside submissions from all the other members taking action in this campaign.",
  buttonText: 'Submit',
  campaignId: null,
  className: null,
  informationContent: null,
  informationTitle: 'More Info',
  pageId: null,
  textFieldLabel: 'I did something by...',
  textFieldPlaceholder: 'Indicate what you did to make a difference.',
  title: 'Submit your text',
};

export default TextSubmissionAction;
