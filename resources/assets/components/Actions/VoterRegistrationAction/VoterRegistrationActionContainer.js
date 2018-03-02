import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';

import VoterRegistrationAction from './VoterRegistrationAction';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: state.user.id,
  campaignId: state.campaign.legacyCampaignId,
  campaignRunId: state.campaign.legacyCampaignRunId,
  modalType: state.modal.modalType,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(PuckConnector(VoterRegistrationAction));
