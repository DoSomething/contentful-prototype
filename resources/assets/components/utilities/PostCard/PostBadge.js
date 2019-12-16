import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import hiddenIcon from './hiddenIcon.svg';
import pendingIcon from './pendingIcon.svg';
import rejectedIcon from './rejectedIcon.svg';

const PostBadge = ({ className, status, tags }) => {
  if (status === 'REJECTED') {
    return (
      <img
        className={classnames('post-badge', className)}
        alt="This post has been marked as rejected."
        title="This post has been marked as rejected."
        src={rejectedIcon}
      />
    );
  }

  if (status === 'PENDING') {
    return (
      <img
        className={classnames('post-badge', className)}
        alt="This post is awaiting review."
        title="This post is awaiting review."
        src={pendingIcon}
      />
    );
  }

  // If we can see tags for this post, and one is 'hide in gallery'.
  if (tags && tags.includes('hide-in-gallery')) {
    return (
      <img
        className={classnames('post-badge', className)}
        alt="This post is hidden in the public gallery."
        title="This post is hidden in the public gallery."
        src={hiddenIcon}
      />
    );
  }

  return null;
};

PostBadge.propTypes = {
  status: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

PostBadge.defaultProps = {
  tags: [],
};

export default PostBadge;
