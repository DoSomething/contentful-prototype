import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { UsaStates } from 'usa-states';

import PaginatedQuery from '../../PaginatedQuery';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { withoutNulls } from '../../../helpers';
import { postCardFragment } from '../../utilities/PostCard/PostCard';
import { reactionButtonFragment } from '../../utilities/ReactionButton/ReactionButton';

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

    // console.log('⛩', filterType);
    // console.log('⛩ Filtering enabled: ', Boolean(filterType));

    this.state = {
      filterValue: null,
      enableFiltering: Boolean(filterType),
    };
  }

  handleSelect = event => {
    console.log(`US-${event.target.value}`);

    this.setState({
      filterValue: `US-${event.target.value}`,
    });
  };

  componentDidMount() {
    console.log('🗿 PostGalleryBlockQuery mounted...');
  }

  componentDidUpdate() {
    console.log('🗿 PostGalleryBlockQuery updated...');
  }

  render() {
    console.log('🗿 PostGalleryBlockQuery render...');

    const { actionIds, className, filterType, itemsPerRow } = this.props;
    console.log('💎', { actionIds, className, filterType, itemsPerRow });

    const states = new UsaStates({ exclude: ['DC'] }).format({
      $abbreviation: 'abbr',
      $name: 'name',
    });

    return (
      <React.Fragment>
        {this.state.enableFiltering ? (
          <div className="select grid-narrow margin-bottom-lg">
            <select value={this.state.filterValue} onChange={this.handleSelect}>
              <option key="default" value="">
                Select a state
              </option>
              {states.map(state => (
                <option key={state.name} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
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
