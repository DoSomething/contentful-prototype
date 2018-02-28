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
import TabbedNavigationContainer from '../Navigation/TabbedNavigationContainer';

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
const Feed = (props) => {
  const { actionText, blocks, callToAction, campaignId, dashboard, signedUp, hasPendingSignup,
    isAuthenticated, canLoadMorePages, clickedViewMore, clickedSignUp } = props;

  const viewMoreOrSignup = signedUp ? clickedViewMore : () => clickedSignUp(campaignId);
  const revealer = (
    <Revealer
      title={signedUp ? 'view more' : actionText}
      callToAction={signedUp ? '' : callToAction}
      isLoading={hasPendingSignup}
      isVisible={(isAuthenticated && ! signedUp) || canLoadMorePages}
      onReveal={() => viewMoreOrSignup()}
      isSignedUp={signedUp}
    />
  );

  return (
    <div>
      <LedeBannerContainer />
      <div className="main clearfix">
        { dashboard ? <DashboardContainer /> : null }
        <TabbedNavigationContainer />
        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          <Flex className="feed">
            {blocks.map(renderFeedItem)}
          </Flex>
          {revealer}
        </Enclosure>
        <CallToActionContainer className="-sticky" hideIfSignedUp />
      </div>
    </div>
  );
};

Feed.propTypes = {
  actionText: PropTypes.string.isRequired,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.string,
    additionalContent: PropTypes.instanceOf(Object),
  })),
  callToAction: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
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
  clickedSignUp: PropTypes.func.isRequired,
};

Feed.defaultProps = {
  blocks: [],
  dashboard: null,
};

export default Feed;
