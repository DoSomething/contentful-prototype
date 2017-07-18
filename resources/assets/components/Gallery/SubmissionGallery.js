import PropTypes from 'prop-types';
import React from 'react';
import Gallery from './Gallery';
import ReportbackItem from '../ReportbackItem';
import { makeHash } from '../../helpers';

class SubmissionGallery extends React.Component {
  static renderReportbackItem(submission) {
    // @TODO: Normalize data for uploaded RBs vs API retrieved RBs if possible...
    const key = makeHash(submission.media.uri || submission.media.filePreviewUrl);
    const url = submission.media.uri || submission.media.filePreviewUrl;

    return <ReportbackItem key={key} {...submission} url={url} reaction={null} basicDisplay />;
  }

  componentDidMount() {
    this.props.fetchUserReportbacks(this.props.userId, this.props.legacyCampaignId);
  }

  render() {
    const isFetching = this.props.submissions.isFetching;
    const items = this.props.submissions.items;

    return isFetching
      ? <div className="spinner -centered" />
      : <Gallery type="triad">
        {items.map(submission => SubmissionGallery.renderReportbackItem(submission))}
      </Gallery>;
  }
}

SubmissionGallery.propTypes = {
  fetchUserReportbacks: PropTypes.func.isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  submissions: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.array,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default SubmissionGallery;
