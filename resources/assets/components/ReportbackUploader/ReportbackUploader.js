/* global FormData */

import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';
import { BlockWrapper } from '../Block';
import { Flex, FlexCell } from '../Flex';
import Markdown from '../Markdown';
import MediaUploader from '../MediaUploader';
import FormMessage from '../FormMessage';
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

  handleOnFileUpload(media) {
    this.setState({ media });
  }

  handleOnSubmitForm(event) {
    event.preventDefault();

    const { settings } = this.props;
    const quantityOverride = get(settings, 'quantityOverride');
    const reportbackAffirmation = get(settings, 'reportbackAffirmation') || (
      ReportbackUploader.defaultProps.settings.reportbackAffirmation
    );

    const reportback = {
      media: this.state.media,
      caption: this.caption.value,
      impact: quantityOverride || this.impact.value,
      whyParticipated: this.why_participated.value,
      campaignId: this.props.legacyCampaignId,
      status: 'pending',
    };

    const fileType = reportback.media.file ? reportback.media.file.type : null;

    reportback.media.type = fileType ? fileType.substring(0, fileType.indexOf('/')) : null;

    this.props.submitReportback(
      ReportbackUploader.setFormData(reportback),
      reportbackAffirmation,
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
    const { submissions, settings } = this.props;

    const impactInput = (
      <div>
        <label className="field-label" htmlFor="impact">Total number of {this.props.noun.plural} made?</label>
        <input className="text-field" id="impact" name="impact" type="text" placeholder="Enter # here -- like '300' or '5'" ref={input => (this.impact = input)} />
      </div>
    );

    return (
      <Flex>
        <FlexCell width="two-thirds" className="padding-horizontal-md">
          <BlockWrapper>
            <div className="reportback-uploader">
              <h2 className="heading">Upload your photos</h2>

              { submissions.messaging ? <FormMessage messaging={submissions.messaging} /> : null }

              <form className="reportback-form" onSubmit={this.handleOnSubmitForm} ref={form => (this.form = form)}>
                <MediaUploader label="Add your photo here" media={this.state.media} onChange={this.handleOnFileUpload} />

                <div className="wrapper">
                  <div className="form-item">
                    <label className="field-label" htmlFor="caption">Add a caption to your photo.</label>
                    <input className="text-field" id="caption" name="caption" type="text" placeholder="60 characters or less" ref={input => (this.caption = input)} />
                  </div>

                  { (settings && settings.quantityOverride) ? null : impactInput }
                </div>

                <div className="form-item">
                  <label className="field-label" htmlFor="why_participated">Why is this campaign important to you?</label>
                  <textarea className="text-field" id="why_participated" name="why_participated" placeholder="No need to write an essay, but we'd love to see why this matters to you!" ref={input => (this.why_participated = input)} />
                </div>

                <button className="button" type="submit" disabled={submissions.isStoring}>Submit a new photo</button>
              </form>
            </div>
          </BlockWrapper>
        </FlexCell>
        { settings && settings.moreInformation ? (
          <FlexCell width="one-third">
            <BlockWrapper title="More Info">
              <Markdown>{settings.moreInformation}</Markdown>
            </BlockWrapper>
          </FlexCell>
        ) : null}
      </Flex>
    );
  }
}

ReportbackUploader.propTypes = {
  legacyCampaignId: PropTypes.string.isRequired,
  submissions: PropTypes.shape({
    isFetching: PropTypes.bool,
    isStoring: PropTypes.bool,
    items: PropTypes.array,
    messaging: PropTypes.object,
    reportback: PropTypes.object,
  }).isRequired,
  submitReportback: PropTypes.func.isRequired,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
  settings: PropTypes.shape({
    moreInformation: PropTypes.string,
    quantityOverride: PropTypes.number,
    reportbackAffirmation: PropTypes.string,
  }),
  trackEvent: PropTypes.func.isRequired,
};

ReportbackUploader.defaultProps = {
  noun: {
    singular: 'item',
    plural: 'items',
  },
  settings: {
    moreInformation: null,
    quantityOverride: null,
    reportbackAffirmation: 'Thanks! We got your photo and you\'re entered to win the scholarship!',
  },
};

export default ReportbackUploader;
