const BLOCKS_PER_ROW = 3;
const ROWS_PER_PAGE = 5;

/**
 * Map the given display option to a numeric point value.
 *
 * @param {Array} displayOption
 * @return int
 */
export function mapDisplayToPoints(displayOption) {
  switch (displayOption[0]) {
    case 'one-third': return 1;
    case 'two-thirds': return 2;
    case 'full': return 3;
    default: return 0;
  }
}

/**
 * Get the blocks from the application state.
 * @param state
 */
export const getBlocks = (state) => state.campaign.activityFeed;

/**
 * Get the number of blocks that are visible in the feed.
 * @param state
 * @returns {number}
 */
export const getBlockOffset = (state) => state.blocks.offset * BLOCKS_PER_ROW * ROWS_PER_PAGE;

/**
 * Get the number of blocks that are visible in the feed.
 * @param state
 * @returns {number}
 */
export const getMaximumOffset = (state) => totalBlocksInFeed(state) + (state.reportbacks.total - totalReportbackBlocksInFeed(state));

/**
 * Calculate the total number of "blocks" in the feed.
 * @param state
 * @returns {*}
 */
export function totalBlocksInFeed(state) {
  return getBlocks(state)
    .reduce((total, block) => {
      return total + mapDisplayToPoints(block.fields.displayOptions)
    }, 0);
}

/**
 * Calculate the total number of reportback "blocks" in the feed.
 * @param state
 * @returns {*}
 */
export function totalReportbackBlocksInFeed(state) {
  return getBlocks(state)
    .filter(block => block.fields.type === 'reportbacks')
    .reduce((total, block) => {
      return total + mapDisplayToPoints(block.fields.displayOptions);
    }, 0);
}

/**
 * Filter the blocks based on the page offset.
 *
 * @param state
 */
export function getVisibleBlocks(state) {
  const blockOffset = getBlockOffset(state);
  let totalPoints = 0;

  // Filter out blocks that don't fit within offset.
  const filteredBlocks = getBlocks(state).filter(block => {
    totalPoints += mapDisplayToPoints(block.fields.displayOptions);
    return totalPoints <= blockOffset;
  });

  // If we weren't able to fill enough rows with blocks, add
  // additional reportback blocks until we hit the target.
  while (totalPoints < blockOffset && totalPoints < getMaximumOffset(state)) {
    filteredBlocks.push({
      id: 'dynamic',
      type: 'customBlock',
      fields: {
        type: 'reportbacks',
        displayOptions: ['one-third'],
        additionalContent: { count: 1 }
      }
    });
    totalPoints++;
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

  return blocks.map(block => {
    if (block.fields.type !== 'reportbacks') return block;

    // Attach some unique reportback IDs to each block.
    const count = mapDisplayToPoints(block.fields.displayOptions);
    block.reportbacks = reportbacks.slice(reportbackIndex, reportbackIndex += count);

    return block;
  });
}
