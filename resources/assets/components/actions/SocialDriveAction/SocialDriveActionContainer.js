import { connect } from 'react-redux';

import SocialDriveAction from './SocialDriveAction';
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
export default connect(mapStateToProps)(SocialDriveAction);
