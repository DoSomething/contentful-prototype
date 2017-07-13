import PropTypes from 'prop-types';
import React from 'react';
import Gallery from './Gallery';
import ReportbackItem from '../ReportbackItem';
import { makeHash } from '../../helpers';

const renderReportbackItem = (submission) => {
  // @TODO: Normalize data for uploaded RBs vs API retrieved RBs if possible...
  const key = makeHash(submission.media.uri || submission.media.filePreviewUrl);
  const url = submission.media.uri || submission.media.filePreviewUrl;

  return <ReportbackItem key={key} {...submission} url={url} reaction={null} basicDisplay />;
};

const SubmissionGallery = ({ submissions }) => {
  const { isFetching = false, items } = submissions;


  return isFetching
    ? <div className="spinner -centered" />
    : <Gallery type="triad">
      {items.map(submission => renderReportbackItem(submission))}
    </Gallery>;
};

SubmissionGallery.propTypes = {
  submissions: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.array,
  }).isRequired,
};

export default SubmissionGallery;
