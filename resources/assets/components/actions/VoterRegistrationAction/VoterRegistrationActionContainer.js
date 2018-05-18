import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';

import { getUserId } from '../../../selectors/user';
import VoterRegistrationAction from './VoterRegistrationAction';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: getUserId(state),
  campaignId: state.campaign.legacyCampaignId,
  campaignRunId: state.campaign.legacyCampaignRunId,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(PuckConnector(VoterRegistrationAction));
