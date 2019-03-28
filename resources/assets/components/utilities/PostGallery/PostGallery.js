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

const PostGallery = props => {
  const {
    id,
    className,
    loading,
    onRender,
    posts,
    itemsPerRow,
    loadMorePosts,
    hideReactions,
    waypointName,
  } = props;

  // If specified, execute callback to let parent component know PostGallery is rendered.
  if (onRender) {
    onRender();
  }

  return posts.length ? (
    <div id={id} className={classnames(className)}>
      {waypointName ? (
        <PuckWaypoint
          name={`${waypointName}-top`}
          waypointData={{ contentfulId: id }}
        />
      ) : null}

      <Gallery
        type={get(galleryTypes, itemsPerRow)}
        className="post-gallery expand-horizontal-md"
      >
        {posts.map(post => (
          <PostCard key={post.id} post={post} hideReactions={hideReactions} />
        ))}
      </Gallery>
      <LoadMore
        buttonClassName="-tertiary"
        className="padding-lg text-center"
        text="view more"
        onClick={loadMorePosts}
        isLoading={loading}
      />

      {waypointName ? (
        <PuckWaypoint
          name={`${waypointName}-bottom`}
          waypointData={{ contentfulId: id }}
        />
      ) : null}
    </div>
  ) : (
    <div className="rounded bg-white grid-narrow padding-lg margin-bottom-lg color-gray">
      <em>No Results Found</em>
    </div>
  );
};

PostGallery.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  itemsPerRow: PropTypes.oneOf(Object.keys(galleryTypes).map(Number)),
  loading: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  onRender: PropTypes.func,
  posts: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  hideReactions: PropTypes.bool,
  waypointName: PropTypes.string,
};

PostGallery.defaultProps = {
  id: null,
  className: null,
  itemsPerRow: 3,
  onRender: null,
  posts: [],
  hideReactions: false,
  waypointName: null,
};

export default PostGallery;
