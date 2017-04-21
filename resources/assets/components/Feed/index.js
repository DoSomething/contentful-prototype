import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';
import { mergeMetadata } from '../../helpers/analytics';
import CallToActionContainer from '../../containers/CallToActionContainer';
import CampaignUpdateBlock from '../CampaignUpdateBlock';
import PlaceholderBlock from '../PlaceholderBlock';
import ReportbackBlock from '../ReportbackBlock';
import Revealer from '../Revealer';
import StaticBlock from '../StaticBlock';
import { Flex, FlexCell } from '../Flex';
import './feed.scss';

/**
 * Render a single feed item.
 *
 * @param block
 * @param index
 * @returns {XML}
 */
const renderFeedItem = (block, index) => {
  const BlockComponent = get({
    'campaign_update': CampaignUpdateBlock,  // eslint-disable-line quote-props
    'join_cta': CallToActionContainer, // eslint-disable-line quote-props
    'reportbacks': ReportbackBlock, // eslint-disable-line quote-props
    'static': StaticBlock, // eslint-disable-line quote-props
  }, block.fields.type, PlaceholderBlock);

  return (
    <FlexCell key={`${block.id}-${index}`} width={block.fields.displayOptions[0]}>
      <BlockComponent {...block} />
    </FlexCell>
  );
};

/**
 * Render the feed.
 *
 * @returns {XML}
 */
const Feed = (props) => {
  const { blocks, callToAction, campaignId, signedUp, hasPendingSignup, isAuthenticated,
    canLoadMorePages, clickedViewMore, clickedSignUp } = props;

  const metadata = mergeMetadata(Feed.defaultMetadata, {});
  const viewMoreOrSignup = signedUp ? clickedViewMore : () => clickedSignUp(campaignId, metadata);
  const revealer = (
    <Revealer
      title={signedUp ? 'view more' : 'join us'}
      callToAction={signedUp ? '' : callToAction}
      isLoading={hasPendingSignup}
      isVisible={(isAuthenticated && ! signedUp) || canLoadMorePages}
      onReveal={() => viewMoreOrSignup()}
    />
  );

  return (
    <div>
      <Flex className="feed">
        {blocks.map(renderFeedItem)}
      </Flex>
      {revealer}
    </div>
  );
};

Feed.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.string,
    additionalContent: PropTypes.instanceOf(Object),
  })),
  callToAction: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  signedUp: PropTypes.bool.isRequired,
  hasPendingSignup: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  canLoadMorePages: PropTypes.bool.isRequired,
  clickedViewMore: PropTypes.func.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
};

Feed.defaultProps = {
  blocks: [],
};

Feed.defaultMetadata = {
  source: 'feed',
};

export default Feed;
