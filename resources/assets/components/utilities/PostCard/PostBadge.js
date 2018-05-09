import React from 'react';
import PropTypes from 'prop-types';

const PostBadge = ({ status, tags }) => {
  if (status === 'REJECTED') {
    return (
      <div
        className="post-badge -rejected"
        title="This post has been marked as rejected."
      />
    );
  }

  if (status !== 'ACCEPTED' || tags.includes('hide-in-gallery')) {
    return (
      <div
        className="post-badge"
        title="This post is awaiting review or hidden in the gallery."
      />
    );
  }

  return null;
};

PostBadge.propTypes = {
  status: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

PostBadge.defaultProps = {
  tags: [],
};

export default PostBadge;
