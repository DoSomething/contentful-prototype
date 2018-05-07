/* global FormData */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { camelCase, get } from 'lodash';

import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import MediaUploader from '../../utilities/MediaUploader';
import FormValidation from '../../utilities/Form/FormValidation';
import { getFieldErrors, setFormData } from '../../../helpers/forms';

class PhotoSubmissionAction extends React.Component {
  state = {
    captionValue: '',
    file: this.defaultMediaState,
    quantityValue: '',
    showModal: false,
    whyParticipatedValue: '',
  };

  componentDidUpdate(prevProps) {
    // console.log(prevProps);
  }

  defaultMediaState = {
    file: null,
    filePreviewUrl: null,
    type: null,
    uri: null,
  };

  handleChange = event => {
    this.setState({
      [`${camelCase(event.target.name)}Value`]: event.target.value,
    });
  };

  handleFileUpload = media => {
    this.setState({
      file: media,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log(event);
    console.log(this.props.id);

    this.props.clearPostSubmissionItem(this.props.id);

    const type = 'photo';

    const action = get(this.props.additionalContent, 'action', 'default');

    setFormData();
    const formData = new FormData();

    formData.append('id', this.props.id);
    formData.append('action', action);
    formData.append('type', type);
    formData.append('text', this.state.captionValue);
    formData.append('quantity', this.state.quantityValue);
    formData.append('why_participated', this.state.whyParticipatedValue);

    if (this.props.legacyCampaignId && this.props.legacyCampaignRunId) {
      formData.append(
        'details',
        JSON.stringify({
          campaign_id: this.props.campaignId,
          legacy_campaign_id: this.props.legacyCampaignId,
          legacy_campaign_run_id: this.props.legacyCampaignRunId,
        }),
      );
    }

    // Send request to store the campaign photo submission post.
    this.props.storeCampaignPost(this.props.campaignId, {
      action,
      body: formData,
      id: this.props.id,
      type,
    });
  };

  resetForm = () => {
    this.setState({
      captionValue: '',
      file: this.defaultMediaState,
      quantityValue: '',
      whyParticipatedValue: '',
    });
  };

  render() {
    const formResponse = this.props.submissions.items[this.props.id] || null;

    const errors = getFieldErrors(formResponse);

    return (
      <React.Fragment>
        <Card
          className={classnames(
            'bordered rounded photo-submission-action',
            this.props.className,
          )}
          title={this.props.title}
        >
          {formResponse ? <FormValidation response={formResponse} /> : null}

          <form onSubmit={this.handleSubmit}>
            <div className="wrapper">
              <div className="form-section">
                <div className="form-item-group padding-md">
                  <MediaUploader
                    label="Add your photo here"
                    media={this.state.file}
                    onChange={this.handleFileUpload}
                  />

                  <div className="form-item">
                    <label
                      className={classnames('field-label')}
                      htmlFor="caption"
                    >
                      {this.props.captionFieldLabel}
                    </label>
                    <input
                      className={classnames('text-field')}
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
                <div className="form-item-group padding-md">
                  <div className="form-item">
                    <label
                      className={classnames('field-label')}
                      htmlFor="quantity"
                    >
                      {this.props.quantityFieldLabel}
                    </label>
                    <input
                      className={classnames('text-field')}
                      type="text"
                      id="quantity"
                      name="quantity"
                      placeholder={this.props.quantityFieldPlaceholder}
                      value={this.state.quantityValue}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-item">
                    <label
                      className={classnames('field-label')}
                      htmlFor="why_participated"
                    >
                      {this.props.whyParticipatedFieldLabel}
                    </label>
                    <textarea
                      className={classnames('text-field')}
                      id="why_participated"
                      name="why_participated"
                      placeholder={this.props.whyParticipatedFieldPlaceholder}
                      value={this.state.whyParticipatedValue}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              loading={this.props.submissions.isPending}
              attached
            >
              {this.props.buttonText}
            </Button>
          </form>
        </Card>

        {this.state.showModal ? <Modal /> : null}
      </React.Fragment>
    );
  }
}

PhotoSubmissionAction.propTypes = {
  buttonText: PropTypes.string,
  captionFieldLabel: PropTypes.string,
  captionFieldPlaceholder: PropTypes.string,
  className: PropTypes.string,
  clearPostSubmissionItem: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  quantityFieldLabel: PropTypes.string,
  quantityFieldPlaceholder: PropTypes.string,
  submissions: PropTypes.shape({
    isPending: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  title: PropTypes.string,
  whyParticipatedFieldLabel: PropTypes.string,
  whyParticipatedFieldPlaceholder: PropTypes.string,
};

PhotoSubmissionAction.defaultProps = {
  buttonText: 'Submit a new photo',
  captionFieldLabel: 'Add a caption to your photo.',
  captionFieldPlaceholder: '60 characters or less',
  className: null,
  quantityFieldLabel: 'How many items are in this photo?',
  quantityFieldPlaceholder: 'Quantity # (300)',
  title: 'Submit your photo',
  whyParticipatedFieldLabel: 'Why is this campaign important to you?',
  whyParticipatedFieldPlaceholder:
    "No need to write an essay, but we'd love to see why this matters to you!",
};

export default PhotoSubmissionAction;
