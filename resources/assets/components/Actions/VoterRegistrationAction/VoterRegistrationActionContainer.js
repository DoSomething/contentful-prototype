import { connect } from 'react-redux';

import VoterRegistrationAction from './VoterRegistrationAction';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: state.user.id,
  campaignId: state.campaign.legacyCampaignId,
  campaignRunId: state.campaign.legacyCampaignRunId,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(VoterRegistrationAction);
