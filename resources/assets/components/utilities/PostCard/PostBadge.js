import React from 'react';
import PropTypes from 'prop-types';

const PostBadge = ({ status, tags }) =>
  status !== 'ACCEPTED' || tags.includes('hide-in-gallery') ? (
    <div
      className="post-badge"
      title="This post is awaiting review or hidden in the gallery."
    />
  ) : null;

PostBadge.propTypes = {
  status: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

PostBadge.defaultProps = {
  tags: [],
};

export default PostBadge;
