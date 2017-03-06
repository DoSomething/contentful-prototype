import React from 'react';
import { get } from 'lodash';

import CallToActionBlock from '../CallToActionBlock';
import CampaignUpdateBlock from '../CampaignUpdateBlock';
import PlaceholderBlock from '../PlaceholderBlock';
import ReportbackBlock from "../ReportbackBlock";
import { Flex, FlexCell } from '../Flex';
import ReportbackUploader from '../ReportbackUploader';
import './feed.scss';

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
      'join_cta': CallToActionBlock,
      'reportbacks': ReportbackBlock,
    }, block.type, PlaceholderBlock);

    return <FlexCell key={block.id + '-' + index} width={block.fields.displayOptions}><BlockComponent {...block} /></FlexCell>;
  }

  mapDisplayToPoints(displayOption) {
    switch (displayOption[0]) {
      case 'full': return 3;
      case 'one-third': return 1;
      case 'two-thirds': return 2;
      default: return 0;
    }
  }

  /**
   * Render the feed.
   *
   * @returns {XML}
   */
  render() {
    let blockPoints = 0;
    let feed = this.props.campaign.activityFeed;
    let reportbacks = this.props.reportbacks;

    // @TODO: This should be moved into a separate data normalization layer.
    feed.map((block) => {
      // Set root-level type property if it's a custom block.
      const type = block.type === 'customBlock' ? block.fields.type : block.type;
      block.type = type;

      blockPoints += this.mapDisplayToPoints(block.fields.displayOptions);

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
            {feed.map((block, index) => this.renderFeedItem(block, index))}
            <FlexCell key="reportback_uploader">
              <ReportbackUploader/>
            </FlexCell>
          </Flex>
        </div>
      </div>
    );
  }
};

export default Feed;
