import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PuckWaypoint } from '@dosomething/puck-client';

import Gallery from '../Gallery/Gallery';
import LoadMore from '../LoadMore/LoadMore';
import PostCard from '../PostCard/PostCard';

import './post-gallery.scss';

// Mapping of 'items per row' to gallery style.
const galleryTypes = {
  2: 'duo',
  3: 'triad',
};

const noPostsOutput = shouldShowNoResults =>
  shouldShowNoResults ? (
    <div className="rounded bg-white p-6 color-gray">
      <em>No Results Found</em>
    </div>
  ) : null;

const PostGallery = props => {
  const {
    id,
    className,
    hideCaption,
    hideQuantity,
    hideReactions,
    itemsPerRow,
    loading,
    loadMorePosts,
    onRender,
    posts,
    shouldShowNoResults,
    waypointName,
  } = props;

  // If specified, execute callback to let parent component know PostGallery is rendered.
  if (onRender) {
    onRender();
  }

  return posts.length ? (
    <div id={id} className={classnames('post-gallery', className)}>
      {waypointName ? (
        <PuckWaypoint
          name={`${waypointName}-top`}
          waypointData={{ contentfulId: id }}
        />
      ) : null}

      <Gallery type={get(galleryTypes, itemsPerRow)} className="-mx-3">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            hideCaption={hideCaption}
            hideQuantity={hideQuantity}
            hideReactions={hideReactions}
          />
        ))}
      </Gallery>

      {loadMorePosts ? (
        <LoadMore
          buttonClassName="-tertiary"
          className="p-6 text-center"
          text="view more"
          onClick={loadMorePosts}
          isLoading={loading}
        />
      ) : null}

      {waypointName ? (
        <PuckWaypoint
          name={`${waypointName}-bottom`}
          waypointData={{ contentfulId: id }}
        />
      ) : null}
    </div>
  ) : (
    noPostsOutput(shouldShowNoResults)
  );
};

PostGallery.propTypes = {
  className: PropTypes.string,
  hideCaption: PropTypes.bool,
  hideQuantity: PropTypes.bool,
  hideReactions: PropTypes.bool,
  id: PropTypes.string,
  itemsPerRow: PropTypes.oneOf(Object.keys(galleryTypes).map(Number)),
  loading: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func,
  onRender: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
  shouldShowNoResults: PropTypes.bool,
  waypointName: PropTypes.string,
};

PostGallery.defaultProps = {
  className: null,
  hideCaption: false,
  hideQuantity: false,
  hideReactions: false,
  id: null,
  itemsPerRow: 3,
  loadMorePosts: null,
  onRender: null,
  posts: [],
  shouldShowNoResults: false,
  waypointName: null,
};

export default PostGallery;
