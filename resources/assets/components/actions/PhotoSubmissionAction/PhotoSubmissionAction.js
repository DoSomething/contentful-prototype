/* eslint-disable react/sort-comp */

import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, has, invert, mapValues } from 'lodash';
import { PuckWaypoint } from '@dosomething/puck-client';

import graphqlClient from '../../../graphql';
import Card from '../../utilities/Card/Card';
import Button from '../../utilities/Button/Button';
import PostCreatedModal from '../PostCreatedModal';
import ActionInformation from '../ActionInformation';
import MediaUploader from '../../utilities/MediaUploader';
import {
  getUserActionSchoolId,
  getUserCampaignSignups,
} from '../../../helpers/api';
import FormValidation from '../../utilities/Form/FormValidation';
import { env, withoutUndefined, withoutNulls } from '../../../helpers';
import PrivacyLanguage from '../../utilities/PrivacyLanguage/PrivacyLanguage';
import {
  calculateDifference,
  getFieldErrors,
  formatPostPayload,
} from '../../../helpers/forms';

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
    whyParticipatedFieldLabel
    whyParticipatedFieldPlaceholder
    buttonText
    informationTitle
    informationContent
    affirmationContent
  }
`;

class PhotoSubmissionAction extends React.Component {
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

      return {
        shouldResetForm: true,
        showModal: true,
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
    };

    // Needed to fetch the user action school ID via GraphQL.
    this.gqlClient = graphqlClient(env('GRAPHQL_URL'));
  }

  /**
   * Lifecycle method invoked immediately after a component is mounted.
   *
   * @return {void}
   */
  componentDidMount() {
    const request = getUserCampaignSignups(
      this.props.userId,
      this.props.campaignId,
    );

    // @TODO: handle if errors.
    request.then(response => {
      this.handleSignupResponse(response.data[0]);
    });
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

    const schoolId = await getUserActionSchoolId(
      this.gqlClient,
      this.props.userId,
      this.props.actionId,
    );

    const formFields = withoutNulls({
      action,
      type,
      id: this.props.id, // @TODO: rename property to blockId?
      action_id: this.props.actionId,
      // Associate state values to fields.
      ...values,
      file: this.state.mediaValue.file || '',
      show_quantity: this.props.showQuantityField ? 1 : 0,
      school_id: schoolId,
    });

    // Send request to store the campaign photo submission post.
    this.props.storeCampaignPost(this.props.campaignId, {
      action,
      actionId: this.props.actionId,
      blockId: this.props.id,
      body: formatPostPayload(formFields),
      pageId: this.props.pageId,
      type,
    });
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

    return (
      <React.Fragment>
        <div className="clearfix">
          <div className="photo-submission-action">
            <PuckWaypoint
              name="photo_submission_action-top"
              waypointData={{ blockId: this.props.id }}
            />
            <Card
              className={classnames('bordered rounded', this.props.className)}
              title={this.props.title}
            >
              {formResponse ? <FormValidation response={formResponse} /> : null}

              <form
                className="photo-submission-form"
                onSubmit={this.handleSubmit}
              >
                <div className="wrapper">
                  <div className="form-section">
                    <div className="wrapper">
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
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="wrapper">
                      {this.props.showQuantityField ? (
                        <div className="form-item">
                          {quantity ? (
                            <div className="quantity-display py-3">
                              <span className="quantity-display__units">
                                total items
                              </span>
                              <span className="quantity-display__total">
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
                              ? 'You can enter your new total here:'
                              : this.props.quantityFieldLabel}
                          </label>
                          <input
                            className={classnames('text-field', {
                              'has-error shake': has(errors, 'quantity'),
                            })}
                            type="text"
                            id="quantity"
                            name="quantity"
                            placeholder={this.props.quantityFieldPlaceholder}
                            value={this.state.quantityValue}
                            onChange={this.handleChange}
                          />
                        </div>
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
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  loading={submissionItem && submissionItem.isPending}
                  attached
                >
                  {this.props.buttonText}
                </Button>
                <PrivacyLanguage />
              </form>
            </Card>
            <PuckWaypoint
              name="photo_submission_action-bottom"
              waypointData={{ blockId: this.props.id }}
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
            userId={this.props.userId}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

PhotoSubmissionAction.propTypes = {
  actionId: PropTypes.number,
  affirmationContent: PropTypes.string,
  buttonText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
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
  submissions: PropTypes.shape({
    isPending: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  title: PropTypes.string,
  userId: PropTypes.string.isRequired,
  whyParticipatedFieldLabel: PropTypes.string,
  whyParticipatedFieldPlaceholder: PropTypes.string,
};

PhotoSubmissionAction.defaultProps = {
  actionId: null,
  affirmationContent:
    "Thanks for joining the movement, and submitting your photo! After we review your submission, we'll add it to the public gallery alongside submissions from all the other members taking action in this campaign.",
  buttonText: 'Submit a new photo',
  captionFieldLabel: 'Add a caption to your photo.',
  captionFieldPlaceholder: '60 characters or less',
  className: null,
  informationContent:
    'A DoSomething staffer will review and approve your photo.',
  informationTitle: 'More Info',
  numberOfParticipantsFieldLabel: null,
  quantityFieldLabel: 'How many items are in this photo?',
  quantityFieldPlaceholder: 'Quantity # (e.g. 300)',
  showQuantityField: true,
  title: 'Submit your photo',
  whyParticipatedFieldLabel: 'Why is this campaign important to you?',
  whyParticipatedFieldPlaceholder:
    "No need to write an essay, but we'd love to see why this matters to you!",
};

export default PhotoSubmissionAction;
