import React from 'react';
import Feed from '../Feed';

class CampaignFeed extends React.Component {

  constructor(props) {
    super(props);

    this.formulateFeed = this.formulateFeed.bind(this);
  }

  componentDidMount() {
    this.formulateFeed();
  }

  /**
   * Map the given display option to a
   * numeric point value.
   *
   * @param array displayOption
   * @return int
   */
  mapDisplayToPoints(displayOption) {
    switch (displayOption[0]) {
      case 'one-third': return 1;
      case 'two-thirds': return 2;
      case 'full': return 3;
      default: return 0;
    }
  }

  /**
   * Set root-level type property if it's a custom block.
   *
   * @param Object block
   */
  setType(block) {
    const type = block.type === 'customBlock' ? block.fields.type : block.type;
    block.type = type;
  }

  /**
   * If it's a reportback block, load in the requested number of reportbacks.
   *
   * @param Object block
   */
  appendReportbacks(block) {
    if (block.type === 'reportbacks') {
      block.reportbacks = [];

      const count = block.fields.additionalContent.count || 3;
      for (let i = 0; i < count; i++) {
        const reportback = this.props.reportbacks.data.shift();

        if (reportback) {
          block.reportbacks.push(reportback);
        }
      }
    }
  }

  /**
   * Create another page of blocks to render.
   */
  formulateFeed() {
    let blockPoints = 0;
    const blocks = [];

    const feedIndex = this.props.blocks.data ? this.props.blocks.data.length : 0;
    const feed = this.props.campaign.activityFeed.slice(feedIndex);
    feed.some((block) => {
      const displayOptions = block.fields.displayOptions;
      blockPoints += this.mapDisplayToPoints(displayOptions);

      // 3 equals a filled row of block(s)
      if (blockPoints / 3 > this.props.rowsPerPage) {
        return true;
      }

      this.setType(block);
      this.appendReportbacks(block);
      blocks.push(block);
    });

    // TODO: Rename recievedBlocks
    this.props.recievedBlocks(blocks);
  }

  render() {
    return (
      <Feed blocks={this.props.blocks.data} viewMore={this.formulateFeed} />
    );
  }

}

CampaignFeed.defaultProps = {
  rowsPerPage: 3,
  campaign: {
    activityFeed: [],
  },
  reportbacks: {
    data: [],
  },
  blocks: {
    data: [],
  },
};

export default CampaignFeed;
