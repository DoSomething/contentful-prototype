/* global FormData */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import Card from '../Card';
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

    if (props.friendReferralRB) {
      this.state = {
        ...this.state,
        friendName: null,
        friendEmail: null,
        friendStory: null,
      };
    }
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
      media: this.state.media,
      caption: this.caption.value,
      impact: this.props.showQuantityField ? this.impact.value : 1,
      whyParticipated: this.why_participated.value,
      campaignId: this.props.legacyCampaignId,
      status: 'pending',
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
      shouldShowAffirmation, toggleReportbackAffirmation, friendReferralRB,
    } = this.props;

    const shouldDisplaySubmissionMessaging = submissions.messaging && submissions.messaging.error;

    const isInvalidField = name => (
      Object.keys(get(submissions, 'messaging.error.fields', {}))
        .indexOf(name) !== -1
    );

    const infoFieldNames = friendReferralRB ? ['friendName', 'friendEmail', 'friendStory'] : ['whyParticipated'];
    const inputClassnames = ['impact', 'caption', ...infoFieldNames]
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
      <div className="form-item">
        <label className={inputClassnames.impact.label} htmlFor="impact">Total number of {this.props.noun.plural} made?</label>
        <input className={inputClassnames.impact.textField} id="impact" name="impact" type="text" placeholder="Enter # here -- like '300' or '5'" ref={input => (this.impact = input)} />
      </div>
    );

    const friendReferralFields = friendReferralRB ? (
      <div>
        <div className="form-item">
          <label className={inputClassnames.friendName.label} htmlFor="friendName">Friend&#39;s Name</label>
          <input className={inputClassnames.friendName.textField} id="friendName" name="friendName" type="text" placeholder="Garfield" ref={input => (this.friendName = input)} />
        </div>
        <div className="form-item">
          <label className={inputClassnames.friendEmail.label} htmlFor="friendEmail">{'Friend\'s Email'}</label>
          <input className={inputClassnames.friendEmail.textField} id="friendEmail" name="friendEmail" type="text" placeholder="garfield@lesagna.com" ref={input => (this.friendEmail = input)} />
        </div>
        <div className="form-item">
          <label className={inputClassnames.friendStory.label} htmlFor="friendStory">{'Friend\'s Story'}</label>
          <textarea className={inputClassnames.friendStory.textField} id="friendStory" name="friendStory" type="text" placeholder="No need to write an essay, but we'd love to know why your friend deserves the scholarship." ref={input => (this.friendStory = input)} />
        </div>
      </div>
    ) : null;

    const reportbackUploader = (
      <form className="reportback-form" onSubmit={this.handleOnSubmitForm} ref={form => (this.form = form)}>
        <Flex>
          <FlexCell width="full">
            { shouldDisplaySubmissionMessaging ? (
              <FormMessage messaging={submissions.messaging} />
            ) : null }
          </FlexCell>
          <FlexCell width="half" className="reportback-form__uploader">
            <MediaUploader label="Add your photo here" media={this.state.media} onChange={this.handleOnFileUpload} hasError={isInvalidField('media')} />
            <div className="form-item">
              <label className={inputClassnames.caption.label} htmlFor="caption">Add a caption to your photo.</label>
              <input className={inputClassnames.caption.textField} id="caption" name="caption" type="text" placeholder="60 characters or less" ref={input => (this.caption = input)} />
            </div>
          </FlexCell>
          <FlexCell width="half">
            { showQuantityField ? impactInput : null }
            <label className={inputClassnames.whyParticipated.label} htmlFor="why_participated">Why is this campaign important to you?</label>
            <textarea className={inputClassnames.whyParticipated.textField} id="why_participated" name="why_participated" placeholder="No need to write an essay, but we'd love to see why this matters to you!" ref={input => (this.why_participated = input)} />
          </FlexCell>
        </Flex>
      </form>
    );

    return (
      <Flex>
        <FlexCell width="two-thirds" className="padding-horizontal-md margin-vertical-md">
          <Card title="Upload your photos" className="bordered rounded">
            <div className="reportback-uploader padding-md">
              {reportbackUploader}
            </div>
            <button className="button reportback-uploader-submit" type="submit" disabled={submissions.isStoring} onClick={this.handleOnSubmitForm}>Submit a new photo</button>
          </Card>
        </FlexCell>
        { informationContent ? (
          <FlexCell width="one-third" className="reportback-uploader-information margin-vertical-md">
            <Card title={informationTitle} className="bordered rounded">
              <Markdown className="padding-md">{informationContent}</Markdown>
            </Card>
          </FlexCell>
        ) : null}
        { shouldShowAffirmation ? (
          <FlexCell width="two-thirds" className="padding-horizontal-md margin-vertical-md">
            <Card title="We Got Your Photo" className="bordered rounded" onClose={() => toggleReportbackAffirmation(false)}>
              <Markdown className="padding-md">{this.getAffirmationContent()}</Markdown>
            </Card>
          </FlexCell>
        ) : null}
      </Flex>
    );
  }
}

ReportbackUploader.propTypes = {
  affirmationContent: PropTypes.string,
  friendReferralRB: PropTypes.bool,
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
  friendReferralRB: false,
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
