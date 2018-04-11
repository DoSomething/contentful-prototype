import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card'; // @TODO: move into utilities
import Gallery from '../../Gallery'; // @TODO: move into utilities
import LoadMore from '../../LoadMore'; // @TODO: move into utilities
import PostCard from '../PostCard/PostCard';

import './post-gallery.scss';

const PostGallery = props => {
  const { loading, posts, loadMorePosts } = props;

  return (
    <div>
      <Gallery type="triad" className="post-gallery expand-horizontal-md">
        {posts.map(post => (
          <Card className="rounded" key={post.id}>
            <PostCard post={post} />
          </Card>
        ))}
      </Gallery>
      <LoadMore
        className="padding-lg text-centered"
        text="view more"
        onClick={loadMorePosts}
        isLoading={loading}
      />
    </div>
  );
};

PostGallery.propTypes = {
  posts: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  loading: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
};

PostGallery.defaultProps = {
  posts: [],
};

export default PostGallery;
