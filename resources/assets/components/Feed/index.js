import React from 'react';
import { get } from 'lodash';

import Affirmation from '../Affirmation';
import CallToActionContainer from '../../containers/CallToActionContainer';
import CampaignUpdateBlock from '../CampaignUpdateBlock';
import PlaceholderBlock from '../PlaceholderBlock';
import ReportbackBlock from '../ReportbackBlock';
import ReportbackUploaderContainer from '../../containers/ReportbackUploaderContainer';
import Revealer from '../Revealer';
import StaticBlock from '../StaticBlock';
import { Flex, FlexCell } from '../Flex';

/**
 * Render a single feed item.
 *
 * @param block
 * @param index
 * @returns {XML}
 */
const renderFeedItem = (block, index) => {
  const BlockComponent = get({
    'campaign_update': CampaignUpdateBlock,
    'join_cta': CallToActionContainer,
    'reportbacks': ReportbackBlock,
    'static': StaticBlock,
  }, block.fields.type, PlaceholderBlock);

  return (
    <FlexCell key={block.id + '-' + index} width={block.fields.displayOptions[0]}>
      <BlockComponent {...block} />
    </FlexCell>
  );
};

/**
 * Render the feed.
 *
 * @returns {XML}
 */
const Feed = ({ blocks, callToAction, campaignId, signedUp, hasNewSignup, hasPendingSignup, isAuthenticated, canLoadMorePages, clickedViewMore, clickedSignUp }) => {
  const viewMoreOrSignup = signedUp ? clickedViewMore : () => clickedSignUp(campaignId);
  const revealer = <Revealer title={signedUp ? 'view more' : 'sign up'}
                             callToAction={signedUp ? '' : callToAction}
                             isLoading={hasPendingSignup}
                             isVisible={(isAuthenticated && !signedUp) || canLoadMorePages}
                             onReveal={() => viewMoreOrSignup()} />;

  return (
    <Flex>
      {hasNewSignup ? <Affirmation /> : null}
      {blocks.map(renderFeedItem)}
      {revealer}
      <FlexCell key="reportback_uploader" width="full">
        <ReportbackUploaderContainer/>
      </FlexCell>
    </Flex>
  );
};

Feed.defaultProps = {
  blocks: [],
};

export default Feed;
