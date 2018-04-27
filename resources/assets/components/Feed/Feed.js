import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ContentfulEntry from '../ContentfulEntry';
import Revealer from '../Revealer';
import Enclosure from '../Enclosure';
import { Flex, FlexCell } from '../Flex';
import { CallToActionContainer } from '../CallToAction';
import DashboardContainer from '../Dashboard/DashboardContainer';
import LedeBannerContainer from '../LedeBanner/LedeBannerContainer';
import CampaignPageNavigationContainer from '../CampaignPageNavigation/CampaignPageNavigationContainer';

import './feed.scss';

/**
 * Render a single feed item.
 *
 * @param block
 * @param index
 * @returns {XML}
 */
const renderFeedItem = (block, index) => (
  <FlexCell
    key={`${block.id}-${index}`}
    width={block.fields.displayOptions}
    className={classnames('padded', {
      'display-flex': block.type === 'reportbacks',
    })}
  >
    <ContentfulEntry json={block} />
  </FlexCell>
);

/**
 * Render the feed.
 *
 * @returns {XML}
 */
class Feed extends React.Component {
  componentDidMount() {
    // If we don't have reportbacks in the store, fetch some!
    if (!this.props.hasReportbacks) {
      this.props.fetchReportbacks();
    }
  }

  render() {
    const {
      blocks,
      callToAction,
      dashboard,
      signedUp,
      hasPendingSignup,
      isAuthenticated,
      canLoadMorePages,
      clickedViewMore,
    } = this.props;

    const shouldShowRevealer =
      (isAuthenticated && !signedUp) || canLoadMorePages;
    const revealer = (
      <Revealer
        title="view more"
        callToAction={signedUp ? '' : callToAction}
        isLoading={hasPendingSignup}
        onReveal={clickedViewMore}
        isSignedUp={signedUp}
      />
    );

    return (
      <div>
        <LedeBannerContainer />
        <div className="main clearfix">
          {dashboard ? <DashboardContainer /> : null}
          <CampaignPageNavigationContainer />
          <Enclosure className="default-container margin-top-lg margin-bottom-lg">
            <Flex className="feed">{blocks.map(renderFeedItem)}</Flex>
            {shouldShowRevealer ? revealer : null}
          </Enclosure>
          <CallToActionContainer sticky hideIfSignedUp />
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  hasReportbacks: PropTypes.bool.isRequired,
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      content: PropTypes.string,
      additionalContent: PropTypes.instanceOf(Object),
    }),
  ),
  callToAction: PropTypes.string.isRequired,
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  signedUp: PropTypes.bool.isRequired,
  hasPendingSignup: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  canLoadMorePages: PropTypes.bool.isRequired,
  clickedViewMore: PropTypes.func.isRequired,
  fetchReportbacks: PropTypes.func.isRequired,
};

Feed.defaultProps = {
  blocks: [],
  dashboard: null,
};

export default Feed;
