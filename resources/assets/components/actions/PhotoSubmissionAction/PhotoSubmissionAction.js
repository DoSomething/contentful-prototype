/* eslint-disable react/sort-comp */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, has, invert, mapValues } from 'lodash';

import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import { withoutUndefined } from '../../../helpers';
import Markdown from '../../utilities/Markdown/Markdown';
import MediaUploader from '../../utilities/MediaUploader';
import { getUserCampaignSignups } from '../../../helpers/api';
import FormValidation from '../../utilities/Form/FormValidation';
import { getFieldErrors, setFormData } from '../../../helpers/forms';

import './photo-submission-action.scss';

class PhotoSubmissionAction extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const response = nextProps.submissions.items[nextProps.id] || null;

    if (has(response, 'status.success')) {
      return {
        shouldResetForm: true,
        showModal: true,
      };
    }

    return null;
  }

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
      quantityValue: '',
      shouldResetForm: false,
      signup: null,
      showModal: false,
      whyParticipatedValue: '',
    };

    this.props.initPostSubmissionItem(this.props.id);
  }

  componentDidMount() {
    const request = getUserCampaignSignups(
      this.props.userId,
      this.props.legacyCampaignId,
      this.props.legacyCampaignRunId,
    );

    // @TODO: handle if errors.
    request.then(response => {
      this.handleSignupResponse(response.data[0]);
    });
  }

  componentDidUpdate() {
    if (this.state.shouldResetForm) {
      this.resetForm();
    }
  }

  fields = () => {
    const items = {
      file: 'media',
      text: 'caption',
      why_participated: 'whyParticipated',
    };

    if (this.props.showQuantityField) {
      items.quantity = 'quantity';
    }

    return items;
  };

  handleChange = event => {
    this.setState({
      [`${event.target.name}Value`]: event.target.value,
    });
  };

  handleFileUpload = media => {
    this.setState({
      mediaValue: media,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.resetPostSubmissionItem(this.props.id);

    const type = 'photo';

    const action = get(this.props.additionalContent, 'action', 'default');

    const formData = setFormData(
      {
        action,
        type,
        id: this.props.id,
        // Associate state values to fields.
        ...mapValues(this.fields(), value => this.state[`${value}Value`]),
        file: this.state.mediaValue.file || '',
        show_quantity: this.props.showQuantityField ? 1 : 0,
      },
      this.props,
    );

    // Send request to store the campaign photo submission post.
    this.props.storeCampaignPost(this.props.campaignId, {
      action,
      body: formData,
      id: this.props.id,
      type,
    });
  };

  handleSignupResponse = data => {
    this.setState({
      signup: data,
    });
  };

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
    });
  };

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
                            <div className="quantity-display padding-vertical-md">
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
                  loading={submissionItem ? submissionItem.isPending : true}
                  attached
                >
                  {this.props.buttonText}
                </Button>
              </form>
            </Card>
          </div>

          {this.props.informationContent ? (
            <div className="photo-submission-information">
              <Card
                title={this.props.informationTitle}
                className="bordered rounded"
              >
                <Markdown className="padding-md">
                  {this.props.informationContent}
                </Markdown>
              </Card>
            </div>
          ) : null}
        </div>

        {this.state.showModal ? (
          <Modal onClose={() => this.setState({ showModal: false })}>
            <Card className="bordered rounded" title="We got your photo!">
              <Markdown className="padded">
                {this.props.affirmationContent ||
                  PhotoSubmissionAction.defaultProps.affirmationContent}
              </Markdown>
            </Card>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

PhotoSubmissionAction.propTypes = {
  affirmationContent: PropTypes.string,
  additionalContent: PropTypes.shape({
    action: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  captionFieldLabel: PropTypes.string,
  captionFieldPlaceholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  informationContent: PropTypes.string,
  informationTitle: PropTypes.string,
  initPostSubmissionItem: PropTypes.func.isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  legacyCampaignRunId: PropTypes.string.isRequired,
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
  additionalContent: null,
  affirmationContent:
    "Thanks for joining the movement, and submitting your photo! After we review your submission, we'll add it to the public gallery alongside submissions from all the other members taking action in this campaign.",
  buttonText: 'Submit a new photo',
  captionFieldLabel: 'Add a caption to your photo.',
  captionFieldPlaceholder: '60 characters or less',
  className: null,
  informationContent:
    'A DoSomething staffer will review and approve your photo.',
  informationTitle: 'More Info',
  quantityFieldLabel: 'How many items are in this photo?',
  quantityFieldPlaceholder: 'Quantity # (e.g. 300)',
  showQuantityField: true,
  title: 'Submit your photo',
  whyParticipatedFieldLabel: 'Why is this campaign important to you?',
  whyParticipatedFieldPlaceholder:
    "No need to write an essay, but we'd love to see why this matters to you!",
};

export default PhotoSubmissionAction;
