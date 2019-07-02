import React from 'react';
import gql from 'graphql-tag';
import { split } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import PaginatedQuery from '../../PaginatedQuery';
import ScrollConcierge from '../../ScrollConcierge';
import { query, withoutValueless } from '../../../helpers';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../utilities/PostCard/PostCard';
import { reactionButtonFragment } from '../../utilities/ReactionButton/ReactionButton';
import SelectLocationDropdown from '../../utilities/SelectLocationDropdown/SelectLocationDropdown';

import './post-gallery-block.scss';

/**
 * Shared query logic when querying PostGallery content type from Contentful.
 */
export const PostGalleryBlockFragment = gql`
  fragment PostGalleryBlockFragment on PostGalleryBlock {
    actionIds
    itemsPerRow
    filterType
    hideReactions
  }
`;

/**
 * The GraphQL query to load data for this component by action ID(s).
 */
const ACTION_GALLERY_QUERY = gql`
  query ActionGalleryQuery(
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
 * The GraphQL query to load data for this component by campaign ID.
 */
const CAMPAIGN_GALLERY_QUERY = gql`
  query CampaignGalleryQuery(
    $campaignId: String
    $count: Int
    $location: String
    $page: Int
    $tags: [String]
    $type: String
  ) {
    posts(
      campaignId: $campaignId
      count: $count
      location: $location
      page: $page
      tags: $tags
      type: $type
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

    // FilterType specified on Contentful PostGallery entry.
    const filterType =
      this.props.filterType === 'none' ? null : this.props.filterType;

    let filterValue = '';
    let hasUrlOptions = false;
    let options = query(`options[${this.props.id}]`);

    options = options ? split(options, ':') : null;

    if (this.validQueryOptions(options, filterType)) {
      filterValue = options[1];
      hasUrlOptions = true;
    }

    this.state = {
      filterValue,
      filterType,
      hasUrlOptions,
      shouldScrollToFilter: false,
    };
  }

  /**
   * Validate the supplied URL options.
   *
   * @param  {Array} options
   * @param  {String} filterType
   * @return {Boolean}
   */
  validQueryOptions = (options, filterType) => {
    if (!options || options.length <= 1) {
      return false;
    }

    const validFilterType = options[0] === filterType;

    let validFilterValue = false;

    if (filterType === 'location') {
      const regex = new RegExp(`^US-[A-Z]{2}$`, 'g');

      validFilterValue = options[1].match(regex);
    }

    return Boolean(validFilterType && validFilterValue);
  };

  /**
   * Handle select dropdown filter changes.
   *
   * @param  {Object} event
   * @return {Void}
   */
  handleSelect = event => {
    this.setState({
      filterValue: event.target.value,
    });
  };

  /**
   * Callback for when PostGallery has rendered.
   *
   * @return {Void}
   */
  galleryReady = () => {
    if (this.state.hasUrlOptions && !this.state.shouldScrollToFilter) {
      this.setState({
        shouldScrollToFilter: true,
      });
    }
  };

  render() {
    const {
      actionIds,
      campaignId,
      className,
      count,
      hideCaption,
      hideQuantity,
      hideReactions,
      id,
      itemsPerRow,
      paginated,
      type,
    } = this.props;

    const queryName = campaignId
      ? CAMPAIGN_GALLERY_QUERY
      : ACTION_GALLERY_QUERY;

    return (
      <React.Fragment>
        {this.state.filterType === 'location' ? (
          <div className="post-gallery-block-filter margin-horizontal-auto margin-bottom-lg">
            {this.state.shouldScrollToFilter ? <ScrollConcierge /> : null}
            <SelectLocationDropdown
              locationList="domestic"
              onSelect={this.handleSelect}
              selectedOption={this.state.filterValue}
            />
          </div>
        ) : null}

        <PaginatedQuery
          query={queryName}
          queryName="posts"
          variables={withoutValueless({
            actionIds,
            campaignId,
            type,
            location: this.state.filterValue || null,
          })}
          count={count}
        >
          {({ result, fetching, fetchMore }) => (
            <PostGallery
              id={id}
              className={classnames(className)}
              hideCaption={hideCaption}
              hideQuantity={hideQuantity}
              hideReactions={hideReactions}
              itemsPerRow={itemsPerRow}
              loading={fetching}
              loadMorePosts={paginated ? fetchMore : null}
              onRender={this.galleryReady}
              posts={result}
              shouldShowNoResults
              waypointName="post_gallery_block"
            />
          )}
        </PaginatedQuery>
      </React.Fragment>
    );
  }
}

PostGalleryBlockQuery.propTypes = {
  actionIds: PropTypes.arrayOf(PropTypes.number),
  campaignId: PropTypes.string,
  className: PropTypes.string,
  count: PropTypes.number,
  filterType: PropTypes.string,
  hideCaption: PropTypes.bool,
  hideQuantity: PropTypes.bool,
  hideReactions: PropTypes.bool,
  id: PropTypes.string,
  itemsPerRow: PropTypes.number,
  paginated: PropTypes.bool,
  type: PropTypes.string,
};

PostGalleryBlockQuery.defaultProps = {
  actionIds: [],
  campaignId: null,
  className: null,
  count: 9,
  filterType: null,
  hideCaption: false,
  hideQuantity: false,
  hideReactions: false,
  id: null,
  itemsPerRow: 3,
  paginated: true,
  type: null,
};

// Export the GraphQL query component.
export default PostGalleryBlockQuery;
