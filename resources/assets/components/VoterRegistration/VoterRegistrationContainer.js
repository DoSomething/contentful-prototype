import { connect } from 'react-redux';
import VoterRegistration from './VoterRegistration';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: state.user.id,
  campaignRunId: state.campaign.legacyCampaignRunId,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(VoterRegistration);
