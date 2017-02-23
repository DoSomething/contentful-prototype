import React from 'react';
import { get } from 'lodash';

import CallToActionBlock from '../CallToActionBlock';
import CampaignUpdateBlock from '../CampaignUpdateBlock';
import PlaceholderBlock from '../PlaceholderBlock';
import ReportbackBlock from "../ReportbackBlock";
import { Flex, FlexCell } from '../Flex';
import './feed.scss';

class Feed extends React.Component {
  /**
   * Render a single feed item.
   *
   * @param block
   * @returns {XML}
   */
  renderFeedItem(block) {
    const BlockComponent = get({
      'campaign_update': CampaignUpdateBlock,
      'join_cta': CallToActionBlock,
      'reportbacks': ReportbackBlock,
    }, block.type, PlaceholderBlock);

    return <FlexCell key={block.id} modifiers={block.fields.displayOptions}><BlockComponent {...block} /></FlexCell>;
  }

  /**
   * Render the feed.
   *
   * @returns {XML}
   */
  render() {
    let feed = this.props.campaign.activityFeed;
    let reportbacks = this.props.reportbacks;

    // @TODO: This should be moved into a separate data normalization layer.
    feed.map((block) => {
      // Set root-level type property if it's a custom block.
      const type = block.type === 'customBlock' ? block.fields.type : block.type;
      block.type = type;

      // If it's a reportback block, load in the requested number of reportbacks.
      if (type === 'reportbacks') {
        block.reportbacks = [];

        const count = block.fields.additionalContent.count || 3;
        for (let i = 0; i < count; i++) {
          let reportback = reportbacks.data.shift();
          if (reportback) {
            block.reportbacks.push(reportback);
          }
        }
      }

      return block;
    });

    return (
      <div className="feed-container">
        <div className="wrapper">
          <Flex>
            {feed.map((block) => this.renderFeedItem(block))}
          </Flex>
        </div>
      </div>
    );
  }
};

export default Feed;
