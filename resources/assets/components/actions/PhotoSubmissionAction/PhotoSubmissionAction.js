/* eslint-disable react/sort-comp */

import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, has, invert, mapValues } from 'lodash';

import PostForm from '../PostForm';
import Card from '../../utilities/Card/Card';
import HoursSpentField from './HoursSpentField';
import { getUserId } from '../../../helpers/auth';
import { featureFlag } from '../../../helpers/env';
import PostCreatedModal from '../PostCreatedModal';
import ActionInformation from '../ActionInformation';
import { getUserCampaignSignups } from '../../../helpers/api';
import FormValidation from '../../utilities/Form/FormValidation';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import { withoutUndefined, withoutNulls } from '../../../helpers/data';
import MediaUploader from '../../utilities/MediaUploader/MediaUploader';
import CharacterLimit from '../../utilities/CharacterLimit/CharacterLimit';
import PrivacyLanguage from '../../utilities/PrivacyLanguage/PrivacyLanguage';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';
import {
  calculateDifference,
  getFieldErrors,
  formatPostPayload,
} from '../../../helpers/forms';
import {
  EVENT_CATEGORIES,
  getPageContext,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

import './photo-submission-action.scss';

export const PhotoSubmissionBlockFragment = gql`
  fragment PhotoSubmissionBlockFragment on PhotoSubmissionBlock {
    actionId
    title
    captionFieldLabel
    captionFieldPlaceholderMessage
    showQuantityField
    quantityFieldLabel
    quantityFieldPlaceholder
    numberOfParticipantsFieldLabel
    whyParticipatedFieldLabel
    whyParticipatedFieldPlaceholder
    buttonText
    informationTitle
    informationContent
    affirmationContent
  }
`;

const CAPTION_CHARACTER_LIMIT = 60;

class PhotoSubmissionAction extends PostForm {
  /**
   * Lifecycle method invoked before every render.
   *
   * @param  {Object} nextProps
   * @return {Object|null}
   */
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
        shouldResetForm: true,
        showModal: !redirectToSubmissionPage,
      };
    }

    return null;
  }

  /**
   * Create a new instance.
   *
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    // @TODO: Update the MediaUploader component and remove need
    // for this object.
    this.defaultMediaState = {
      file: null,
      filePreviewUrl: null,
    };

    this.state = {
      captionValue: '',
      mediaValue: this.defaultMediaState,
      numberOfParticipantsValue: '',
      quantityValue: '',
      shouldResetForm: false,
      showModal: false,
      signup: null,
      whyParticipatedValue: '',
      hoursSpentValue: '',
    };

    this.userId = getUserId();
  }

  /**
   * Lifecycle method invoked immediately after a component is mounted.
   *
   * @return {void}
   */
  componentDidMount() {
    if (this.props.campaignId) {
      const request = getUserCampaignSignups(
        this.userId,
        this.props.campaignId,
      );

      // @TODO: handle if errors.
      request.then(response => {
        this.handleSignupResponse(response.data[0]);
      });
    }
  }

  /**
   * Lifecyle method invoked immediately after updating occurs.
   *
   * @return {void}
   */
  componentDidUpdate() {
    if (this.state.shouldResetForm) {
      this.resetForm();
    }
  }

  /**
   * Fields for the form and their associated references.
   *
   * @return {Array}
   */
  fields = () => {
    const items = {
      file: 'media',
      text: 'caption',
      why_participated: 'whyParticipated',
      hours_spent: 'hoursSpent',
    };

    if (this.props.showQuantityField) {
      items.quantity = 'quantity';
    }

    if (this.props.numberOfParticipantsFieldLabel) {
      items.number_of_participants = 'numberOfParticipants';
    }

    return items;
  };

  /**
   * Handle form input change events.
   *
   * @param  {Object} event
   * @return {void}
   */
  handleChange = event => {
    this.setState({
      [`${event.target.name}Value`]: event.target.value,
    });
  };

  /**
   * Handle file upload event.
   *
   * @param  {Object} media
   * @return {void}
   */
  handleFileUpload = media => {
    this.setState({
      mediaValue: media,
    });
  };

  /**
   * Handle form submit event.
   *
   * @param  {Object} event
   * @return {void}
   */
  handleSubmit = async event => {
    event.preventDefault();

    this.props.resetPostSubmissionItem(this.props.id);

    const type = 'photo';

    // Support legacy Photo Submission Actions without a set actionId.
    const action = 'default';

    const values = mapValues(
      this.fields(),
      value => this.state[`${value}Value`],
    );

    if (this.props.showQuantityField) {
      values.previousQuantity = get(this.state.signup, 'quantity', 0);

      values.quantity = calculateDifference(
        get(this.state.signup, 'quantity', null),
        this.state.quantityValue,
      );
    }

    const formFields = withoutNulls({
      action,
      type,
      id: this.props.id, // @TODO: rename property to blockId?
      action_id: this.props.actionId,
      // Associate state values to fields.
      ...values,
      file: this.state.mediaValue.file || '',
      show_quantity: this.props.showQuantityField ? 1 : 0,
      school_id: await this.getUserActionSchoolId(),
    });

    const data = {
      action,
      actionId: this.props.actionId,
      blockId: this.props.id,
      body: formatPostPayload(formFields),
      pageId: this.props.pageId,
      campaignId: this.props.campaignId,
      type,
    };

    // Send request to store the campaign photo submission post.
    if (this.props.actionId) {
      this.props.storePost(data);
    } else {
      this.props.storeCampaignPost(this.props.campaignId, {
        action,
        actionId: this.props.actionId,
        blockId: this.props.id,
        body: formatPostPayload(formFields),
        pageId: this.props.pageId,
        type,
      });
    }
  };

  /**
   * Handle receiving a signup response.
   *
   * @param  {Object} data
   * @return {void}
   */
  handleSignupResponse = data => {
    this.setState({
      signup: data,
    });
  };

  /**
   * Reset the form fields.
   *
   * @return {void}
   */
  resetForm = () => {
    const signup = get(
      this.props.submissions.items[this.props.id],
      'data.signup.data',
      null,
    );

    this.setState({
      captionValue: '',
      mediaValue: this.defaultMediaState,
      quantityValue: '',
      shouldResetForm: false,
      signup,
      whyParticipatedValue: '',
      numberOfParticipantsValue: '',
      hoursSpentValue: '',
    });
  };

  /**
   * Render the component.
   *
   * @return {ReactComponent}
   */
  render() {
    const submissionItem = this.props.submissions.items[this.props.id];

    const formResponse = has(submissionItem, 'status') ? submissionItem : null;

    const formErrors = getFieldErrors(formResponse);

    const quantity = get(this.state.signup, 'quantity', null);

    // Associate errors to component field names.
    const errors = withoutUndefined(
      formErrors
        ? mapValues(invert(this.fields()), value => formErrors[value])
        : null,
    );

    // If we don't have an authenticated user, then this is a story page
    if (!this.userId) {
      return (
        <>
          <div className="clearfix">
            <div className="photo-submission-action" />

            <Card
              className={classnames('bordered rounded', this.props.className)}
              title={this.props.title}
            >
              <div className="text-center p-3">
                <PrimaryButton
                  className="block text-lg w-full"
                  href={this.props.authRegisterUrl}
                  text="Add Photo"
                  onClick={() =>
                    trackAnalyticsEvent('clicked_button_log_in', {
                      action: 'button_clicked',
                      category: EVENT_CATEGORIES.authentication,
                      label: 'block_auth',
                      context: {
                        ...getPageContext(),
                      },
                    })
                  }
                />
              </div>
            </Card>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="clearfix">
          <div className="photo-submission-action">
            <AnalyticsWaypoint
              name="photo_submission_action-top"
              context={{ blockId: this.props.id }}
            />

            <Card
              className={classnames('bordered rounded', this.props.className)}
              title={this.props.title}
            >
              {formResponse ? <FormValidation response={formResponse} /> : null}

              <form
                className="photo-submission-form p-3"
                onSubmit={this.handleSubmit}
              >
                <div className="wrapper">
                  <div className="form-section md:pr-3">
                    <div className="wrapper pb-3">
                      <MediaUploader
                        label="Add your photo here"
                        media={this.state.mediaValue}
                        onChange={this.handleFileUpload}
                        hasError={has(errors, 'media')}
                      />

                      <div className="form-item">
                        <label
                          className={classnames('field-label', {
                            'has-error': has(errors, 'caption'),
                          })}
                          htmlFor="caption"
                        >
                          {this.props.captionFieldLabel}
                        </label>

                        <input
                          className={classnames('text-field', {
                            'has-error shake': has(errors, 'caption'),
                          })}
                          type="text"
                          id="caption"
                          name="caption"
                          placeholder={this.props.captionFieldPlaceholder}
                          value={this.state.captionValue}
                          onChange={this.handleChange}
                          required
                          maxLength={CAPTION_CHARACTER_LIMIT}
                        />

                        <CharacterLimit
                          className="pt-1"
                          limit={CAPTION_CHARACTER_LIMIT}
                          text={this.state.captionValue}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section md:pl-3">
                    <div className="wrapper py-3 md:pt-0">
                      {this.props.showQuantityField ? (
                        <div className="form-item">
                          {quantity ? (
                            <div className="quantity-display py-3">
                              <span className="block font-bold leading-none mb-2 text-base text-gray-600 uppercase">
                                Total Items - Current
                              </span>

                              <span
                                className="block font-league-gothic leading-none text-4xl"
                                data-testid="quantity-total"
                              >
                                {quantity}
                              </span>
                            </div>
                          ) : null}
                          <label
                            className={classnames('field-label', {
                              'has-error': has(errors, 'quantity'),
                            })}
                            htmlFor="quantity"
                          >
                            {quantity
                              ? 'Total Items - Updated'
                              : this.props.quantityFieldLabel}
                          </label>

                          <input
                            className={classnames('text-field', {
                              'has-error shake': has(errors, 'quantity'),
                            })}
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder={this.props.quantityFieldPlaceholder}
                            value={this.state.quantityValue}
                            onChange={this.handleChange}
                            required
                            min={Number(quantity) + 1}
                          />
                          {quantity ? (
                            <p className="text-sm text-gray-600">
                              This is the total items number above plus the new
                              number you are adding. For instance, if you
                              currently have 1 total item and are adding 1 more,
                              you would enter 2 here.
                            </p>
                          ) : null}
                        </div>
                      ) : null}
                      {this.props.actionId ? (
                        <HoursSpentField
                          actionId={this.props.actionId}
                          hasError={has(errors, 'hoursSpent')}
                        />
                      ) : null}

                      {this.props.numberOfParticipantsFieldLabel ? (
                        <div className="form-item">
                          <label
                            className={classnames('field-label', {
                              'has-error': has(errors, 'numberOfParticipants'),
                            })}
                            htmlFor="numberOfParticipants"
                          >
                            {this.props.numberOfParticipantsFieldLabel}
                          </label>

                          <input
                            className={classnames('text-field', {
                              'has-error shake': has(
                                errors,
                                'numberOfParticipants',
                              ),
                            })}
                            type="text"
                            id="numberOfParticipants"
                            name="numberOfParticipants"
                            placeholder="1"
                            value={this.state.numberOfParticipantsValue}
                            onChange={this.handleChange}
                          />
                        </div>
                      ) : null}

                      <div className="form-item stretched">
                        <label
                          className={classnames('field-label', {
                            'has-error': has(errors, 'whyParticipated'),
                          })}
                          htmlFor="whyParticipated"
                        >
                          {this.props.whyParticipatedFieldLabel}
                        </label>

                        <textarea
                          className={classnames('text-field', {
                            'has-error shake': has(errors, 'whyParticipated'),
                          })}
                          id="whyParticipated"
                          name="whyParticipated"
                          placeholder={
                            this.props.whyParticipatedFieldPlaceholder
                          }
                          value={this.state.whyParticipatedValue}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <PrimaryButton
                  className="block mt-3 text-lg w-full"
                  isLoading={submissionItem && submissionItem.isPending}
                  text={this.props.buttonText}
                  type="submit"
                />

                <PrivacyLanguage className="mb-1 mt-5" />
              </form>
            </Card>

            <AnalyticsWaypoint
              name="photo_submission_action-bottom"
              context={{ blockId: this.props.id }}
            />
          </div>

          {this.props.informationContent ? (
            <ActionInformation
              className="photo-submission-information"
              title={this.props.informationTitle}
              content={this.props.informationContent}
            />
          ) : null}
        </div>

        {this.state.showModal ? (
          <PostCreatedModal
            affirmationContent={this.props.affirmationContent}
            onClose={() => this.setState({ showModal: false })}
            title="We got your photo!"
            userId={this.userId}
          />
        ) : null}
      </>
    );
  }
}

PhotoSubmissionAction.propTypes = {
  actionId: PropTypes.number,
  affirmationContent: PropTypes.string,
  buttonText: PropTypes.string,
  campaignId: PropTypes.string,
  captionFieldLabel: PropTypes.string,
  captionFieldPlaceholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired, // @TODO: rename property to blockId
  informationContent: PropTypes.string,
  informationTitle: PropTypes.string,
  numberOfParticipantsFieldLabel: PropTypes.string,
  pageId: PropTypes.string.isRequired,
  quantityFieldLabel: PropTypes.string,
  quantityFieldPlaceholder: PropTypes.string,
  resetPostSubmissionItem: PropTypes.func.isRequired,
  showQuantityField: PropTypes.bool,
  storeCampaignPost: PropTypes.func.isRequired,
  storePost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    isPending: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  title: PropTypes.string,
  whyParticipatedFieldLabel: PropTypes.string,
  whyParticipatedFieldPlaceholder: PropTypes.string,
};

PhotoSubmissionAction.defaultProps = {
  actionId: null,
  affirmationContent:
    "Thanks for joining the movement, and submitting your photo! After we review your submission, we'll add it to the public gallery alongside submissions from all the other members taking action in this campaign.",
  buttonText: 'Submit a new photo',
  campaignId: null,
  captionFieldLabel: 'Add a title to your photo.',
  captionFieldPlaceholder: '60 characters or less',
  className: null,
  informationContent:
    'A DoSomething staffer will review and approve your photo.',
  informationTitle: 'More Info',
  numberOfParticipantsFieldLabel: null,
  quantityFieldLabel: 'How many items are in this photo?',
  quantityFieldPlaceholder: 'Use numbers (e.g. 1)',
  showQuantityField: true,
  title: 'Submit your photo',
  whyParticipatedFieldLabel: 'Why is this campaign important to you?',
  whyParticipatedFieldPlaceholder:
    "No need to write an essay, but we'd love to see why this matters to you!",
};

export default PhotoSubmissionAction;
