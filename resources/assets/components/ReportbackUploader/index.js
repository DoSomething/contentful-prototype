import PropTypes from 'prop-types';
/* global FormData */

import React from 'react';
import Block from '../Block';
import MediaUploader from '../MediaUploader';
import Gallery from '../Gallery';
import ReportbackItem from '../ReportbackItem';
import FormMessage from '../FormMessage';
import { makeHash } from '../../helpers';
import './reportback-uploader.scss';

class ReportbackUploader extends React.Component {
  static renderReportbackItem(submission) {
    // @TODO: Normalize data for uploaded RBs vs API retrieved RBs if possible...
    const key = makeHash(submission.media.uri || submission.media.filePreviewUrl);
    const url = submission.media.uri || submission.media.filePreviewUrl;

    return <ReportbackItem key={key} {...submission} url={url} reaction={null} basicDisplay />;
  }

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

  componentDidMount() {
    this.props.fetchUserReportbacks(this.props.userId, this.props.legacyCampaignId);
  }

  handleOnFileUpload(media) {
    this.setState({ media });
  }

  handleOnSubmitForm(event) {
    event.preventDefault();

    const reportback = {
      media: this.state.media,
      caption: this.caption.value,
      impact: this.impact.value,
      whyParticipated: this.why_participated.value,
      campaignId: this.props.legacyCampaignId,
      status: 'pending',
    };

    const fileType = reportback.media.file ? reportback.media.file.type : null;

    reportback.media.type = fileType ? fileType.substring(0, fileType.indexOf('/')) : null;

    this.props.submitReportback(ReportbackUploader.setFormData(reportback));

    // @TODO: only reset form AFTER successful RB submission.
    // We'll make this a lot better once we switch to storing all the state
    // in the Redux store @_@
    this.form.reset();
    this.setState({
      media: this.defaultMediaState,
    });
  }

  render() {
    const submissions = this.props.submissions;

    return (
      <Block>
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

              <div>
                <label className="field-label" htmlFor="impact">Total number of {this.props.noun.plural} made?</label>
                <input className="text-field" id="impact" name="impact" type="text" placeholder="Enter # here -- like '300' or '5'" ref={input => (this.impact = input)} />
              </div>
            </div>

            <div className="form-item">
              <label className="field-label" htmlFor="why_participated">Why is this campaign important to you?</label>
              <textarea className="text-field" id="why_participated" name="why_participated" placeholder="No need to write an essay, but we'd love to see why this matters to you!" ref={input => (this.why_participated = input)} />
            </div>

            <button className="button" type="submit" disabled={submissions.isStoring}>Submit a new photo</button>
          </form>
        </div>
        <Gallery isFetching={submissions.isFetching} type="triad">
          {submissions.items.map(submission => ReportbackUploader.renderReportbackItem(submission))}
        </Gallery>
      </Block>
    );
  }
}

ReportbackUploader.propTypes = {
  fetchUserReportbacks: PropTypes.func.isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  submissions: PropTypes.shape({
    isFetching: PropTypes.bool,
    isStoring: PropTypes.bool,
    items: PropTypes.array,
    messaging: PropTypes.object,
    reportback: PropTypes.object,
  }).isRequired,
  submitReportback: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
};

ReportbackUploader.defaultProps = {
  noun: {
    singular: 'item',
    plural: 'items',
  },
};

export default ReportbackUploader;
