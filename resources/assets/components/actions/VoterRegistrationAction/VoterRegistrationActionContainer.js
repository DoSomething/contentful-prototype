import { connect } from 'react-redux';

import VoterRegistrationAction from './VoterRegistrationAction';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  pageId: state.campaign.id || state.page.id,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(VoterRegistrationAction);
