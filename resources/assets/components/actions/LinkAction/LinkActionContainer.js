import { connect } from 'react-redux';

import LinkAction from './LinkAction';
import { getUserId } from '../../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: getUserId(state),
  campaignId: state.campaign.legacyCampaignId,
  campaignRunId: state.campaign.legacyCampaignRunId,
  source: state.user.source || undefined,
});

// Export the container component.
export default connect(mapStateToProps)(LinkAction);
