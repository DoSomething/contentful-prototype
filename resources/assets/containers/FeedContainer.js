import { connect } from 'react-redux';
import Feed from '../components/Feed';
import {
  clickedViewMore,
  clickedSignUp,
  checkForSignup,
  fetchReportbacks,
} from '../actions';

const BLOCKS_PER_ROW = 3;
const ROWS_PER_PAGE = 3;

/**
 * Map the given display option to a numeric point value.
 *
 * @param {Array} displayOption
 * @return int
 */
const mapDisplayToPoints = (displayOption) => {
  switch (displayOption[0]) {
    case 'one-third': return 1;
    case 'two-thirds': return 2;
    case 'full': return 3;
    default: return 0;
  }
};

/**
 * Filter the blocks based on the page offset.
 *
 * @param blocks
 * @param offset
 */
const filterVisibleBlocks = (blocks, offset) => {
  const rowTarget = offset * ROWS_PER_PAGE;
  const pointTarget = rowTarget * BLOCKS_PER_ROW;
  let totalPoints = 0;

  // Filter out blocks that don't fit within offset.
  const filteredBlocks = blocks.filter(block => {
    totalPoints += mapDisplayToPoints(block.fields.displayOptions);
    return totalPoints < pointTarget;
  });

  // If we weren't able to fill enough rows with blocks, add
  // enough additional rows of reportbacks.
  while (totalPoints < pointTarget) {
    // @TODO: There's gotta be a better way of doing this.
    filteredBlocks.push({
      id: String(Math.ceil(Math.random() * 100000)),
      type: 'customBlock',
      fields: {
        type: 'reportbacks',
        displayOptions: ['full'],
        additionalContent: { count: BLOCKS_PER_ROW }
      }
    });
    totalPoints += BLOCKS_PER_ROW;
  }

  return filteredBlocks;
};

/**
 * Append reportback IDs to the reportback blocks.
 * @param reportbacks
 * @param blocks
 */
const appendReportbacks = (reportbacks, blocks) => {
  let reportbackIndex = 0;
  return blocks.map(block => {
    if (block.fields.type !== 'reportbacks') return block;

    // Attach some unique reportback IDs to each block.
    const count = block.fields.additionalContent.count || 3;
    block.reportbacks = reportbacks.slice(reportbackIndex, reportbackIndex += count);

    return block;
  });
};

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    blocks: appendReportbacks(state.reportbacks.ids, filterVisibleBlocks(state.campaign.activityFeed, state.blocks.offset)),
    legacyCampaignId: state.campaign.legacyCampaignId,
    callToAction: state.campaign.callToAction,
    submissions: state.submissions,
    signedUp: state.signups.data.includes(state.campaign.legacyCampaignId),
    hasNewSignup: state.signups.thisSession,
    hasPendingSignup: state.signups.isPending,
    isAuthenticated: state.user.id !== null,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedViewMore,
  clickedSignUp,
  checkForSignup,
  fetchReportbacks,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(Feed);
