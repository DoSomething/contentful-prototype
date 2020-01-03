import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import hiddenIcon from './hidden_icon.svg';
import pendingIcon from './pending_icon.svg';
import rejectedIcon from './rejected_icon.svg';

const PostBadge = ({ className, status, tags }) => {
  if (status === 'REJECTED') {
    return (
      <img
        className={classnames('rejected-icon', className)}
        alt="rejected post icon"
        title="This post has been marked as rejected."
        src={rejectedIcon}
      />
    );
  }

  if (status === 'PENDING') {
    return (
      <img
        className={classnames('pending-icon', className)}
        alt="pending post icon"
        title="This post is awaiting review."
        src={pendingIcon}
      />
    );
  }

  // If we can see tags for this post, and one is 'hide in gallery'.
  if (tags && tags.includes('hide-in-gallery')) {
    return (
      <img
        className={classnames('hidden-icon', className)}
        alt="hidden post icon"
        title="This post is hidden in the public gallery."
        src={hiddenIcon}
      />
    );
  }

  return null;
};

PostBadge.propTypes = {
  className: PropTypes.string,
  status: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

PostBadge.defaultProps = {
  className: null,
  tags: [],
};

export default PostBadge;
