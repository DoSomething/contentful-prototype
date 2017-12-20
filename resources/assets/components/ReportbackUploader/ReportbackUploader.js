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

    const infoFields = props.referralRB ? ({
        friend_name: null,
        friend_email: null,
        friend_story: null,
    }) : ({
        why_participated: null,
    });

    this.state = {
      media: this.defaultMediaState,
      caption: null,
      impact: null,
      ...infoFields,
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

    const infoFields = this.props.referralRB ? ({
      friendName: this.friend_name.value,
      friendEmail: this.friend_email.value,
      friendStory: this.friend_story.value,
    }) : ({
      whyParticipated: this.why_participated.value,
    });

    const reportback = {
      media: this.state.media,
      caption: this.caption.value,
      impact: this.props.showQuantityField ? this.impact.value : 1,
      campaignId: this.props.legacyCampaignId,
      status: 'pending',
      ...infoFields,
    };

    const fileType = reportback.media.file ? reportback.media.file.type : null;

    reportback.media.type = fileType ? fileType.substring(0, fileType.indexOf('/')) : null;

    // TODO Add specific submission method for ReferralRB.
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
      shouldShowAffirmation, toggleReportbackAffirmation, referralRB,
    } = this.props;

    const shouldDisplaySubmissionMessaging = submissions.messaging && submissions.messaging.error;

    const isInvalidField = name => (
      Object.keys(get(submissions, 'messaging.error.fields', {}))
        .indexOf(name) !== -1
    );

    const infoFieldNames = referralRB ? ['friendName', 'friendEmail', 'friendStory'] : ['whyParticipated'];
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

    const infoFields = referralRB ? (
      <div>
        <div className="form-item">
          <label className={inputClassnames.friendName.label} htmlFor="friend_name">Friend&#39;s Name</label>
          <input className={inputClassnames.friendName.textField} id="friend_name" name="friend_name" type="text" placeholder="Garfield" ref={input => (this.friend_name = input)} />
        </div>
        <div className="form-item">
          <label className={inputClassnames.friendEmail.label} htmlFor="friend_email">Friend&#39;s Email</label>
          <input className={inputClassnames.friendEmail.textField} id="friend_email" name="friend_email" type="text" placeholder="garfield@lesagna.com" ref={input => (this.friend_email = input)} />
        </div>
        <div className="form-item">
          <label className={inputClassnames.friendStory.label} htmlFor="friend_story">Friend&#39;s Story</label>
          <textarea className={inputClassnames.friendStory.textField} id="friend_story" name="friend_story" type="text" placeholder="No need to write an essay, but we'd love to know why your friend deserves the scholarship." ref={input => (this.friend_story = input)} />
        </div>
      </div>
    ) : (
      <div className="form-item">
        <label className={inputClassnames.whyParticipated.label} htmlFor="why_participated">Why is this campaign important to you?</label>
        <textarea className={inputClassnames.whyParticipated.textField} id="why_participated" name="why_participated" placeholder="No need to write an essay, but we'd love to see why this matters to you!" ref={input => (this.why_participated = input)} />
      </div>
    );

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
            { infoFields }
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
  referralRB: PropTypes.bool,
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
  referralRB: false,
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
