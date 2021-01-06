import { connect } from 'react-redux';

import ShortLinkShare from './ShortLinkShare';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  pageId: state.campaign.id || state.page.id,
  token: state.user.token,
});

// Export the container component.
export default connect(mapStateToProps)(ShortLinkShare);
