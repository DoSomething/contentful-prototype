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
    posts,
    itemsPerRow,
    loadMorePosts,
    waypointName,
  } = props;

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

      {waypointName ? (
        <PuckWaypoint
          name={`${waypointName}-bottom`}
          waypointData={{ contentfulId: id }}
        />
      ) : null}
    </div>
  ) : null;
};

PostGallery.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  posts: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  itemsPerRow: PropTypes.oneOf(Object.keys(galleryTypes).map(Number)),
  loading: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  waypointName: PropTypes.string,
};

PostGallery.defaultProps = {
  id: null,
  className: null,
  posts: [],
  itemsPerRow: 3,
  waypointName: null,
};

export default PostGallery;
