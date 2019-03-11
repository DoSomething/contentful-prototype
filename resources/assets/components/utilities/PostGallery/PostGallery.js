import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import Gallery from '../Gallery/Gallery';
import LoadMore from '../LoadMore/LoadMore';
import PostCard from '../PostCard/PostCard';

import './post-gallery.scss';

const PostGallery = props => {
  const { loading, posts, itemsPerRow, loadMorePosts } = props;

  // Map the desired 'items per row' to a gallery type.
  const galleryTypes = {
    2: 'duo',
    3: 'triad',
  };

  return posts.length ? (
    <div>
      <Gallery
        type={get(galleryTypes, itemsPerRow)}
        className="post-gallery expand-horizontal-md"
      >
        {posts.map(post => (
          <Card className="rounded h-full" key={post.id}>
            <PostCard post={post} />
          </Card>
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
  posts: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  itemsPerRow: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
};

PostGallery.defaultProps = {
  posts: [],
};

export default PostGallery;
