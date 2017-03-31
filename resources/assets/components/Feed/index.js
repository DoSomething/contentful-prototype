import React from 'react';
import { get } from 'lodash';
import { ensureAuth } from '../../helpers';

import Affirmation from '../Affirmation';
import CallToActionContainer from '../../containers/CallToActionContainer';
import CampaignUpdateBlock from '../CampaignUpdateBlock';
import PlaceholderBlock from '../PlaceholderBlock';
import ReportbackBlock from '../ReportbackBlock';
import ReportbackUploaderContainer from '../../containers/ReportbackUploaderContainer';
import Revealer from '../Revealer';
import StaticBlock from '../StaticBlock';
import { Flex, FlexCell } from '../Flex';

class Feed extends React.Component {
  /**
   * Perform actions immediately after mounting component.
   */
  componentDidMount() {
    // If we don't already have a signup, check.
    if (! this.props.signedUp) {
      this.props.checkForSignup(this.props.legacyCampaignId);
    }

    // Load the first page of reportbacks.
    this.props.fetchReportbacks();

    // TEMP - for testing
    this.props.queueEvent({type: 'TEST', boop: 'bop'});
    this.props.startQueue();
  }

  /**
   * Render a single feed item.
   *
   * @param block
   * @param index
   * @returns {XML}
   */
  renderFeedItem(block, index) {
    const BlockComponent = get({
      'campaign_update': CampaignUpdateBlock,
      'join_cta': CallToActionContainer,
      'reportbacks': ReportbackBlock,
      'static': StaticBlock,
    }, block.fields.type, PlaceholderBlock);

    return <FlexCell key={block.id + '-' + index} width={block.fields.displayOptions[0]}><BlockComponent {...block} /></FlexCell>;
  }

  /**
   * Render the feed.
   *
   * @returns {XML}
   */
  render() {
    const { blocks, signedUp, hasNewSignup, hasPendingSignup, isAuthenticated } = this.props;

    const viewMoreOrSignup = signedUp ? this.props.clickedViewMore : () => this.props.clickedSignUp(this.props.legacyCampaignId);
    const revealer = <Revealer title={signedUp ? 'view more' : 'sign up'}
                               callToAction={signedUp ? '' : this.props.callToAction}
                               isLoading={hasPendingSignup}
                               onReveal={() => ensureAuth(isAuthenticated) && viewMoreOrSignup()} />;

    return (
      <Flex>
        {hasNewSignup ? <Affirmation /> : null}
        {blocks.map((block, index) => this.renderFeedItem(block, index))}
        {revealer}
        <FlexCell key="reportback_uploader" width="full">
          <ReportbackUploaderContainer/>
        </FlexCell>
      </Flex>
    );
  }
}

Feed.defaultProps = {
  blocks: [],
};

export default Feed;
