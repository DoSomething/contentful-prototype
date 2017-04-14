import React from 'react';
import { has } from 'lodash';
import Block from '../Block';
import { Flex } from '../Flex';
import MediaUploader from '../MediaUploader';
import Gallery from '../Gallery';
import ReportbackItem from '../ReportbackItem';
import FormMessage from '../FormMessage';
import { makeHash } from '../../helpers';
import './reportback-uploader.scss';

class ReportbackUploader extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnSubmitForm = this.handleOnSubmitForm.bind(this);
    this.handleOnFileUpload = this.handleOnFileUpload.bind(this);

    this.state = {
      media: this.defaultMediaState(),
      caption: null,
      impact: null,
      why_participated: null
    };
  }

  defaultMediaState() {
    return {
      file: null,
      filePreviewUrl: null,
      type: null,
      uri: null
    }
  };

  componentDidMount() {
    this.props.fetchUserReportbacks(this.props.userId, this.props.legacyCampaignId);
  }

  handleOnFileUpload(media) {
    this.setState({ media })
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

    let fileType = reportback.media.file ? reportback.media.file.type : null;

    reportback.media.type = fileType ? fileType.substring(0, fileType.indexOf('/')) : null;

    this.props.submitReportback(this.setFormData(reportback));

    // @TODO: only reset form AFTER successful RB submission.
    // We'll make this a lot better once we switch to storing all the state
    // in the Redux store @_@
    this.form.reset();
    this.setState({
      media: this.defaultMediaState()
    });
  }

  setFormData(reportback) {
    let formData = new FormData;

    Object.keys(reportback).map((item) => {
      if (item === 'media') {
        formData.append(item, (reportback[item].file || ''));
      }
      else {
        formData.append(item, reportback[item]);
      }
    });

    reportback['formData'] = formData;

    return reportback;
  }

  render() {
    const submissions = this.props.submissions;

    return (
      <Block>
        <div className="reportback-uploader">
          <h2 className="heading">Upload your photos</h2>

          { submissions.messaging ? <FormMessage messaging={submissions.messaging} /> : null }

          <form className="reportback-form" onSubmit={this.handleOnSubmitForm} ref={(form) => this.form = form}>
            <MediaUploader label="Send us your photo" media={this.state.media} onChange={this.handleOnFileUpload} />

            <div className="wrapper">
              <div className="form-item">
                <label className="field-label" htmlFor="caption">Add a caption to your photo.</label>
                <input className="text-field" id="caption" name="caption" type="text" placeholder="Give it your best shot" ref={(input) => this.caption = input} />
              </div>

              <div>
                <label className="field-label" htmlFor="impact">How many cards are in this photo?</label>
                <input className="text-field" id="impact" name="impact" type="text" placeholder="Enter # here -- like '300' or '5'" ref={(input) => this.impact = input} />
              </div>
            </div>

            <div className="form-item">
              <label className="field-label" htmlFor="why_participated">Why is this campaign important to you?</label>
              <textarea className="text-field" id="why_participated" name="why_participated" placeholder="No need to write an essay, but we'd love to see why this matters to you!" ref={(input) => this.why_participated = input}></textarea>
            </div>

            <button className="button" type="submit" disabled={submissions.isStoring ? true : false }>Submit a new photo</button>
          </form>
        </div>
          <Gallery isFetching={submissions.isFetching} type="triad">
            {/* @TODO: Need to normalize data for uploaded RBs vs API retrieved RBs earlier in process if possible... */}
            {submissions.items.map((submission, index) => <ReportbackItem key={makeHash(submission.media.uri || submission.media.filePreviewUrl)} {...submission} url={submission.media.uri || submission.media.filePreviewUrl} reaction={null} />)}
          </Gallery>
      </Block>
    );
  }
}

export default ReportbackUploader;
