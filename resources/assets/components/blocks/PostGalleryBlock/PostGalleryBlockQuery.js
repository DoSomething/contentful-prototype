import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PuckWaypoint } from '@dosomething/puck-client';

import PaginatedQuery from '../../PaginatedQuery';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../utilities/PostCard/PostCard';
import { reactionButtonFragment } from '../../utilities/ReactionButton/ReactionButton';

/**
 * The GraphQL query to load data for this component.
 */
const POST_GALLERY_QUERY = gql`
  query PostGalleryQuery($actionIds: [Int], $count: Int, $page: Int) {
    posts(actionIds: $actionIds, count: $count, page: $page) {
      ...PostCard
      ...ReactionButton
    }
  }

  ${postCardFragment}
  ${reactionButtonFragment}
`;

/**
 * Fetch results via GraphQL using a query component.
 */
const PostGalleryBlockQuery = ({ id, actionIds, className, itemsPerRow }) => (
  <PaginatedQuery
    query={POST_GALLERY_QUERY}
    queryName="posts"
    variables={{ actionIds }}
    count={itemsPerRow * 3}
  >
    {({ result, fetching, fetchMore }) => (
      <React.Fragment>
        <PuckWaypoint
          name="post_gallery_block-top"
          waypointData={{ contentfulId: id }}
        />
        <PostGallery
          className={classnames(className)}
          posts={result}
          loading={fetching}
          itemsPerRow={itemsPerRow}
          loadMorePosts={fetchMore}
        />
        <PuckWaypoint
          name="post_gallery_block-bottom"
          waypointData={{ contentfulId: id }}
        />
      </React.Fragment>
    )}
  </PaginatedQuery>
);

PostGalleryBlockQuery.propTypes = {
  id: PropTypes.string,
  actionIds: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  itemsPerRow: PropTypes.number,
};

PostGalleryBlockQuery.defaultProps = {
  id: null,
  actionIds: [],
  className: null,
  itemsPerRow: 3,
};

// Export the GraphQL query component.
export default PostGalleryBlockQuery;
