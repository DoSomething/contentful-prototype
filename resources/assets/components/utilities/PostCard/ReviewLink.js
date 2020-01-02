import React from 'react';
import PropTypes from 'prop-types';

import editIcon from './editIcon.svg';

const ReviewLink = ({ className, url }) => (
  <a href={url} className={className}>
    <img alt="review and edit icon" title="review this post" src={editIcon} />
  </a>
);

ReviewLink.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
};

ReviewLink.defaultProps = {
  className: null,
};

export default ReviewLink;
