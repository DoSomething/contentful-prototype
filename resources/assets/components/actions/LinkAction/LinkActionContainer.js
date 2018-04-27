import { connect } from 'react-redux';

import LinkAction from './LinkAction';
import { getUserId } from '../../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: getUserId(state),
  campaignId: state.campaign.legacyCampaignId,
});

// Export the container component.
export default connect(mapStateToProps)(LinkAction);
