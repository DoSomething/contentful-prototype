import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import PaginatedQuery from '../../PaginatedQuery';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../utilities/PostCard/PostCard';
import { reactionButtonFragment } from '../../utilities/ReactionButton/ReactionButton';

/**
 * The GraphQL query to load data for this component.
 */
const POST_GALLERY_QUERY = gql`
  query PostGalleryQuery($actionIds: [String], $count: Int, $page: Int) {
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
const PostGalleryBlockQuery = ({ actionIds, itemsPerRow }) => (
  <PaginatedQuery
    query={POST_GALLERY_QUERY}
    queryName="posts"
    variables={{ actionIds }}
    count={itemsPerRow * 3}
  >
    {({ result, fetching, fetchMore }) => (
      <PostGallery
        posts={result}
        loading={fetching}
        itemsPerRow={itemsPerRow}
        loadMorePosts={fetchMore}
      />
    )}
  </PaginatedQuery>
);

PostGalleryBlockQuery.propTypes = {
  actionIds: PropTypes.arrayOf(PropTypes.number),
  itemsPerRow: PropTypes.number,
};

PostGalleryBlockQuery.defaultProps = {
  actionIds: [],
  itemsPerRow: 3,
};

// Export the GraphQL query component.
export default PostGalleryBlockQuery;
