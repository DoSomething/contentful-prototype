import React from 'react';
import Feed from '../Feed';

class CampaignFeed extends React.Component {

  /**
   * Map the given display option to a
   * numeric point value.
   *
   * @param array displayOption
   * @return int
   */
  mapDisplayToPoints(displayOption) {
    switch (displayOption[0]) {
      case 'full': return 3;
      case 'one-third': return 1;
      case 'two-thirds': return 2;
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
   * @param Array reportbacks
   */
  appendReportbacks(block, reportbacks) {
    if (block.type === 'reportbacks') {
      block.reportbacks = [];

      const count = block.fields.additionalContent.count || 3;
      for (let i = 0; i < count; i++) {
        let reportback = reportbacks.shift();
        if (reportback) {
          block.reportbacks.push(reportback);
        }
      }
    }
  }

  formulateFeed() {
    const feed = [];
    const reportbacks = this.props.reportbacks.data.slice(0);
    let blockPoints = 0;

    this.props.campaign.activityFeed.some((block) => {
      const displayOptions = block.fields.displayOptions;
      blockPoints += this.mapDisplayToPoints(displayOptions);

      if (blockPoints % 3 > this.props.rowsPerPage) {
        return true;
      }

      this.setType(block);
      this.appendReportbacks(block, reportbacks);

      feed.push(block);
    });

    return feed;
  }

  render() {
    return (
      <div className="feed-container">
        <div className="wrapper">
          <Feed blocks={this.formulateFeed()} />
        </div>
      </div>
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
};

export default CampaignFeed;
