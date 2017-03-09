import React from 'react';
import Feed from '../Feed';

const BLOCKS_PER_ROW = 3;

class CampaignFeed extends React.Component {

  constructor(props) {
    super(props);

    // Intentionally not attached to the component state as
    // this property should not trigger re-renders.
    this.reportbackIndex = 0;
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
        const reportback = this.props.reportbacks.data[this.reportbackIndex];

        if (reportback) {
          block.reportbacks.push(reportback);
        }

        this.reportbackIndex++;
      }
    }
  }

  /**
   * Create the feed.
   */
  generateFeed() {
    this.reportbackIndex = 0;
    let blockPoints = 0;

    return this.props.campaign.activityFeed.filter((block) => {
      blockPoints += this.mapDisplayToPoints(block.fields.displayOptions);

      const totalRows = blockPoints / BLOCKS_PER_ROW;
      const rowTarget = this.props.blocks.offset * this.props.rowsPerPage;

      if (totalRows > rowTarget) {
        return false;
      }

      this.setType(block);
      this.appendReportbacks(block);
      return true;
    });
  }

  render() {
    const blocks = this.generateFeed();

    return (
      <Feed blocks={blocks} viewMore={this.props.clickedViewMore} />
    );
  }

}

CampaignFeed.defaultProps = {
  rowsPerPage: 3,
};

export default CampaignFeed;
