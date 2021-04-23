import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Gallery from '../Gallery/Gallery';
import PostCard from '../PostCard/PostCard';
import ElementButton from '../Button/ElementButton';
import AnalyticsWaypoint from '../AnalyticsWaypoint/AnalyticsWaypoint';

import './post-gallery.scss';

// Mapping of 'items per row' to gallery style.
const galleryTypes = {
  2: 'duo',
  3: 'triad',
};

const noPostsOutput = shouldShowNoResults =>
  shouldShowNoResults ? (
    <div className="rounded bg-white p-6 color-gray">
      <em>There are no submissions at the moment. Come back soon!</em>
    </div>
  ) : null;

const PostGallery = props => {
  const {
    id,
    className,
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
        <AnalyticsWaypoint
          name={`${waypointName}-top`}
          context={{ blockId: id }}
        />
      ) : null}

      <Gallery type={get(galleryTypes, itemsPerRow)} className="-mx-3">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            hideQuantity={hideQuantity}
            hideReactions={hideReactions}
          />
        ))}
      </Gallery>

      {loadMorePosts ? (
        <div className="p-6 text-center">
          <ElementButton
            attributes={{ 'data-test': 'view-more-button' }}
            className="font-normal text-gray-800 active:text-gray-900 hover:text-gray-800 underline hover:no-underline"
            isLoading={loading}
            onClick={loadMorePosts}
            text="view more"
          />
        </div>
      ) : null}

      {waypointName ? (
        <AnalyticsWaypoint
          name={`${waypointName}-bottom`}
          context={{ blockId: id }}
        />
      ) : null}
    </div>
  ) : (
    noPostsOutput(shouldShowNoResults)
  );
};

PostGallery.propTypes = {
  className: PropTypes.string,
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
