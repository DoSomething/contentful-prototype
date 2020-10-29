import { connect } from 'react-redux';

// import ShortLinkShare from './ShortLinkShare';
import ShortLinkShareUpdate from './ShortLinkShareUpdate';
import { getUserId } from '../../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  pageId: state.campaign.id || state.page.id,
  token: state.user.token,
  userId: getUserId(state),
});

// Export the container component.
export default connect(mapStateToProps)(ShortLinkShareUpdate);
