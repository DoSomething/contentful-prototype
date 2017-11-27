import { getReportbacksInState } from './reportbacks';

const BLOCKS_PER_ROW = 3;
const ROWS_PER_PAGE = 5;
const REPORTBACK_DISPLAY_OPTION = 'one-third';

/**
 * Map the given display option to a numeric point value.
 *
 * @param {Array} displayOption
 * @return int
 */
export function mapDisplayToBlockPoints(displayOption) {
  switch (displayOption) {
    case 'one-third': return 1;
    case 'two-thirds': return 2;
    case 'full': return 3;
    default: return 0;
  }
}

/**
 * Get the point value of a reportback block.
 *
 * @return {Integer}
 */
const getReportbackBlockPoint = () => mapDisplayToBlockPoints(REPORTBACK_DISPLAY_OPTION);

/**
 * Get the blocks from the application state.
 * @param state
 */
export const getBlocks = state => state.campaign.activityFeed;

/**
 * Calculate the total number of "blocks" in the feed.
 * @param state
 * @returns {*}
 */
export function totalBlockPointsInFeed(state) {
  return getBlocks(state)
    .reduce((total, block) => (
      total + mapDisplayToBlockPoints(block.fields.displayOptions)
    ), 0);
}

/**
 * Calculate the total number of reportback block points in the feed.
 * @param state
 * @returns {*}
 */
export function totalReportbackBlockPointsInFeed(state) {
  return getBlocks(state)
    .filter(block => block.type === 'reportbacks')
    .reduce((total, block) => (
      total + mapDisplayToBlockPoints(block.fields.displayOptions)
    ), 0);
}

/**
 * Get the total number of block points that could be visible in the feed.
 *
 * @param state
 * @returns {number}
 */
export const getTotalVisibleBlockPoints = state => (
  state.blocks.page * BLOCKS_PER_ROW * ROWS_PER_PAGE
);

/**
 * Get the number of blocks that are visible in the feed.
 * @param state
 * @returns {number}
 */
export const getMaximumBlockPoints = state => (
  totalBlockPointsInFeed(state) + (
    state.reportbacks.total - totalReportbackBlockPointsInFeed(state)
  )
);

/**
 * Filter the blocks based on the page.
 *
 * @param state
 */
export function getVisibleBlocks(state) {
  const totalReportbackPoints = getReportbacksInState(state) * getReportbackBlockPoint();

  let targetPoints = getTotalVisibleBlockPoints(state);
  let totalPoints = 0;

  // Filter out blocks that don't fit within the page.
  const filteredBlocks = getBlocks(state).filter((block) => {
    totalPoints += mapDisplayToBlockPoints(block.fields.displayOptions);

    return totalPoints <= targetPoints;
  });

  // In case we don't have enough reportbacks in our state to fill the
  // target amount, we'll shave the target number to fit with what we
  // actually have so we don't churn out blank RBs.
  if ((totalReportbackPoints + totalPoints) < targetPoints) {
    targetPoints = totalReportbackPoints + totalPoints;
  }

  // If we weren't able to fill enough rows with blocks, add
  // additional reportback blocks until we hit the target.
  while (totalPoints < targetPoints && totalPoints < getMaximumBlockPoints(state)) {
    filteredBlocks.push({
      id: 'dynamic',
      type: 'reportbacks',
      fields: {
        type: 'reportbacks',
        displayOptions: REPORTBACK_DISPLAY_OPTION,
        additionalContent: { count: 1 },
      },
    });

    totalPoints += getReportbackBlockPoint();
  }

  return filteredBlocks;
}

/**
 * Append reportback IDs to the reportback blocks.
 *
 * @param blocks
 * @param state
 */
export function getBlocksWithReportbacks(blocks, state) {
  const reportbacks = state.reportbacks.ids;
  let reportbackIndex = 0;

  return blocks.map((block) => {
    if (block.type !== 'reportbacks') {
      return block;
    }

    // Attach some unique reportback IDs to each block.
    const start = reportbackIndex;
    const count = mapDisplayToBlockPoints(block.fields.displayOptions);
    reportbackIndex += count;

    return {
      ...block,
      reportbacks: reportbacks.slice(start, reportbackIndex),
    };
  });
}
