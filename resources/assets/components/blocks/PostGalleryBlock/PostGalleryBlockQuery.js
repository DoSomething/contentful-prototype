import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withoutNulls } from '../../../helpers';
import PaginatedQuery from '../../PaginatedQuery';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../utilities/PostCard/PostCard';
import { reactionButtonFragment } from '../../utilities/ReactionButton/ReactionButton';
import SelectLocationDropdown from '../../utilities/SelectLocationDropdown/SelectLocationDropdown';

/**
 * The GraphQL query to load data for this component.
 */
const POST_GALLERY_QUERY = gql`
  query PostGalleryQuery(
    $actionIds: [Int]
    $location: String
    $count: Int
    $page: Int
  ) {
    posts(
      actionIds: $actionIds
      location: $location
      count: $count
      page: $page
    ) {
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
class PostGalleryBlockQuery extends React.Component {
  constructor(props) {
    super(props);

    const filterType =
      this.props.filterType === 'none' ? null : this.props.filterType;

    this.state = {
      filterValue: null,
      enableFiltering: Boolean(filterType),
    };
  }

  handleSelect = event => {
    this.setState({
      filterValue: event.target.value || null,
    });
  };

  render() {
    const { actionIds, className, filterType, itemsPerRow } = this.props;

    return (
      <React.Fragment>
        {this.state.enableFiltering ? (
          <div className="grid-narrow margin-bottom-lg">
            <SelectLocationDropdown
              locationList="domestic"
              onSelect={this.handleSelect}
              selectedOption={this.state.filterValue || ''}
            />
          </div>
        ) : null}

        <PaginatedQuery
          query={POST_GALLERY_QUERY}
          queryName="posts"
          variables={withoutNulls({
            actionIds,
            location: this.state.filterValue,
          })}
          count={itemsPerRow * 3}
        >
          {({ result, fetching, fetchMore }) => (
            <PostGallery
              className={classnames(className)}
              posts={result}
              loading={fetching}
              itemsPerRow={itemsPerRow}
              filterType={filterType}
              loadMorePosts={fetchMore}
            />
          )}
        </PaginatedQuery>
      </React.Fragment>
    );
  }
}

PostGalleryBlockQuery.propTypes = {
  id: PropTypes.string,
  actionIds: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string,
  filterType: PropTypes.string,
  itemsPerRow: PropTypes.number,
};

PostGalleryBlockQuery.defaultProps = {
  id: null,
  actionIds: [],
  className: null,
  filterType: null,
  itemsPerRow: 3,
};

// Export the GraphQL query component.
export default PostGalleryBlockQuery;
