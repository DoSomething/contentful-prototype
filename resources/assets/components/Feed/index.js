import React from 'react';
import { get } from 'lodash';

import CallToActionContainer from '../../containers/CallToActionContainer';
import CampaignUpdateBlock from '../CampaignUpdateBlock';
import PlaceholderBlock from '../PlaceholderBlock';
import StaticBlock from '../StaticBlock';
import { Flex, FlexCell } from '../Flex';
import ReportbackContainer from '../../containers/ReportbackContainer';
import ReportbackUploaderContainer from '../../containers/ReportbackUploaderContainer';

class Feed extends React.Component {
  /**
   * Render a single feed item.
   *
   * @param block
   * @returns {XML}
   */
  renderFeedItem(block, index) {
    const BlockComponent = get({
      'campaign_update': CampaignUpdateBlock,
      'join_cta': CallToActionContainer,
      'reportbacks': ReportbackContainer,
      'static': StaticBlock,
    }, block.type, PlaceholderBlock);

    return <FlexCell key={block.id + '-' + index} width={block.fields.displayOptions[0]}><BlockComponent {...block} /></FlexCell>;
  }

  /**
   * Render the feed.
   *
   * @returns {XML}
   */
  render() {
    return (
      <Flex>
        {this.props.affirmation}
        {this.props.blocks.map((block, index) => this.renderFeedItem(block, index))}
        {this.props.revealer}
        <FlexCell key="reportback_uploader" width="full">
          <ReportbackUploaderContainer/>
        </FlexCell>
      </Flex>
    );
  }
};

Feed.defaultProps = {
  blocks: [],
  revealer: null,
  affirmation: null,
};

export default Feed;
