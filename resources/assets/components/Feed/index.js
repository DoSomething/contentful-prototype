import PropTypes from 'prop-types';
import React from 'react';
import { mergeMetadata } from '../../helpers/analytics';
import Revealer from '../Revealer';
import { Flex, FlexCell } from '../Flex';
import './feed.scss';
import Block from '../Block';

/**
 * Render a single feed item.
 *
 * @param block
 * @param index
 * @returns {XML}
 */
const renderFeedItem = (block, index) => (
  <FlexCell key={`${block.id}-${index}`} width={block.fields.displayOptions[0]}>
    <Block json={block} />
  </FlexCell>
);

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
      isAuthenticated={isAuthenticated}
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
