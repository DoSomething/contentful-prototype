import { connect } from 'react-redux';

import TextSubmissionAction from './TextSubmissionAction';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: state.user.id,
  campaignId: state.campaign.legacyCampaignId,
  campaignRunId: state.campaign.legacyCampaignRunId,
  contentfulId: state.campaign.id,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(TextSubmissionAction);
