/* global FormData */

import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../Card';
import Markdown from '../Markdown';
import FormMessage from '../FormMessage';
import MediaUploader from '../MediaUploader';

import './reportback-uploader.scss';

class ReportbackUploader extends React.Component {
  static setFormData(container) {
    const reportback = container;
    const formData = new FormData();

    Object.keys(reportback).forEach((item) => {
      if (item === 'media') {
        formData.append(item, (reportback[item].file || ''));
      } else {
        formData.append(item, reportback[item]);
      }
    });

    reportback.formData = formData;

    return reportback;
  }

  constructor(props) {
    super(props);

    this.handleOnSubmitForm = this.handleOnSubmitForm.bind(this);
    this.handleOnFileUpload = this.handleOnFileUpload.bind(this);
    this.getAffirmationContent = this.getAffirmationContent.bind(this);

    this.defaultMediaState = {
      file: null,
      filePreviewUrl: null,
      type: null,
      uri: null,
    };

    this.state = {
      media: this.defaultMediaState,
      caption: null,
      impact: null,
      why_participated: null,
    };
  }

  getAffirmationContent() {
    return this.props.affirmationContent || (
      ReportbackUploader.defaultProps.affirmationContent
    );
  }

  handleOnFileUpload(media) {
    this.setState({ media });
  }

  handleOnSubmitForm(event) {
    event.preventDefault();

    const reportback = {
      campaignId: this.props.legacyCampaignId,
      caption: this.caption.value,
      impact: this.props.showQuantityField ? this.impact.value : 1,
      media: this.state.media,
      status: 'pending',
      whyParticipated: this.why_participated.value,
    };

    const fileType = reportback.media.file ? reportback.media.file.type : null;

    reportback.media.type = fileType ? fileType.substring(0, fileType.indexOf('/')) : null;

    this.props.submitReportback(
      ReportbackUploader.setFormData(reportback),
    ).then(() => {
      const trackingData = { campaignId: this.props.legacyCampaignId };
      let trackingMessage;

      if (this.props.submissions.messaging.success) {
        this.form.reset();
        this.setState({
          media: this.defaultMediaState,
        });

        trackingMessage = 'Successful Reportback';
      } else {
        trackingMessage = 'Unsuccessful Reportback';
        trackingData.submission_error = this.props.submissions.messaging.error;
      }

      this.props.trackEvent(trackingMessage, trackingData);
    });
  }

  render() {
    const {
      submissions, showQuantityField, informationTitle, informationContent,
      shouldShowAffirmation, toggleReportbackAffirmation,
    } = this.props;

    const formHasErrors = get(submissions.messaging, 'error', null);

    const isInvalidField = name => (
      Object.keys(get(submissions, 'messaging.error.fields', {}))
        .indexOf(name) !== -1
    );

    // @TODO: passing a hardcoded array is not sustainable...
    const inputClassnames = ['impact', 'caption', 'whyParticipated']
      .reduce((classes, input) => ({
        ...classes,
        [input]: {
          label: classnames('field-label', {
            'has-error': isInvalidField(input),
          }),
          textField: classnames('text-field', {
            'has-error': isInvalidField(input),
            shake: isInvalidField(input),
          }),
        },
      }), {});

    const impactInput = (
      <div className="form-item-group">
        <div className="padding-md">
          <label className={inputClassnames.impact.label} htmlFor="impact">Total number of {this.props.noun.plural} made?</label>
          <input className={inputClassnames.impact.textField} id="impact" name="impact" type="text" placeholder="Enter # here -- like '300' or '5'" ref={input => (this.impact = input)} />
        </div>
      </div>
    );

    return (
      <div>
        <div className="photo-uploader-action clearfix">
          <div className="photo-uploader-form">
            <Card title="Upload your photos" className="bordered rounded">

              { formHasErrors ? <FormMessage messaging={submissions.messaging} /> : null }

              <form className="reportback-post-form" onSubmit={this.handleOnSubmitForm} ref={form => (this.form = form)}>

                <div className="form-section">
                  <div className="form-item-group">
                    <div className="padding-md">
                      <MediaUploader label="Add your photo here" media={this.state.media} onChange={this.handleOnFileUpload} hasError={isInvalidField('media')} />

                      <label className={inputClassnames.caption.label} htmlFor="caption">Add a caption to your photo.</label>
                      <input className={inputClassnames.caption.textField} id="caption" name="caption" type="text" placeholder="60 characters or less" ref={input => (this.caption = input)} />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  { showQuantityField ? impactInput : impactInput }

                  <div className="form-item-group">
                    <div className="padding-md">
                      <label className={inputClassnames.whyParticipated.label} htmlFor="why_participated">Why is this campaign important to you?</label>
                      <textarea className={inputClassnames.whyParticipated.textField} id="why_participated" name="why_participated" placeholder="No need to write an essay, but we'd love to see why this matters to you!" ref={input => (this.why_participated = input)} />
                    </div>
                  </div>
                </div>

                <button className="button" type="submit" disabled={submissions.isStoring}>Submit a new photo</button>
              </form>
            </Card>
          </div>

          <div className="photo-uploader-information">
            <Card title={informationTitle} className="bordered rounded">
              <Markdown className="padding-md">{informationContent}</Markdown>
            </Card>
          </div>
        </div>

        { shouldShowAffirmation ? (
          <div className="photo-uploader-affirmation margin-top-lg">
            <Card title="We Got Your Photo" className="bordered rounded" onClose={() => toggleReportbackAffirmation(false)}>
              <Markdown className="padding-md">{this.getAffirmationContent()}</Markdown>
            </Card>
          </div>
        ) : null}
      </div>
    );
  }
}

ReportbackUploader.propTypes = {
  affirmationContent: PropTypes.string,
  informationContent: PropTypes.string,
  informationTitle: PropTypes.string,
  legacyCampaignId: PropTypes.string.isRequired,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
  shouldShowAffirmation: PropTypes.bool,
  showQuantityField: PropTypes.bool,
  submissions: PropTypes.shape({
    isFetching: PropTypes.bool,
    isStoring: PropTypes.bool,
    items: PropTypes.array,
    messaging: PropTypes.object,
    reportback: PropTypes.object,
  }).isRequired,
  submitReportback: PropTypes.func.isRequired,
  trackEvent: PropTypes.func.isRequired,
  toggleReportbackAffirmation: PropTypes.func.isRequired,
};

ReportbackUploader.defaultProps = {
  affirmationContent: 'Thanks! We got your photo and you\'re entered to win the scholarship!',
  informationContent: null,
  informationTitle: null,
  noun: {
    singular: 'item',
    plural: 'items',
  },
  showQuantityField: true,
  shouldShowAffirmation: false,
};

export default ReportbackUploader;
