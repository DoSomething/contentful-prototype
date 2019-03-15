import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Gallery from '../Gallery/Gallery';
import LoadMore from '../LoadMore/LoadMore';
import PostCard from '../PostCard/PostCard';

import './post-gallery.scss';

// Mapping of 'items per row' to gallery style.
const galleryTypes = {
  2: 'duo',
  3: 'triad',
};

const PostGallery = props => {
  const { className, loading, posts, itemsPerRow, loadMorePosts } = props;

  return posts.length ? (
    <div className={classnames(className)}>
      <Gallery
        type={get(galleryTypes, itemsPerRow)}
        className="post-gallery expand-horizontal-md"
      >
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Gallery>
      <LoadMore
        buttonClassName="-tertiary"
        className="padding-lg text-center"
        text="view more"
        onClick={loadMorePosts}
        isLoading={loading}
      />
    </div>
  ) : null;
};

PostGallery.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  itemsPerRow: PropTypes.oneOf(Object.keys(galleryTypes).map(Number)),
  loading: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
};

PostGallery.defaultProps = {
  className: null,
  posts: [],
  itemsPerRow: 3,
};

export default PostGallery;
