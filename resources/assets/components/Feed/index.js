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

  /**
   * Render the feed.
   *
   * @returns {XML}
   */
  render() {
    return (
      <Flex>
        {this.props.blocks.map((block, index) => this.renderFeedItem(block, index))}

        <div className="flex_cell -full">
          <a className="button -secondary" onClick={this.props.viewMore}>view more</a>
        </div>
      </Flex>
    );
  }
};

Feed.defaultProps = {
  blocks: [],
  viewMore: () => {},
};

export default Feed;
