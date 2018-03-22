import { connect } from 'react-redux';

import TextSubmissionAction from './TextSubmissionAction';
import { storeCampaignPost } from '../../../actions/post';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.id,
  legacyCampaignId: state.campaign.legacyCampaignId,
  legacyCampaignRunId: state.campaign.legacyCampaignRunId,
  type: 'text',
});

const actionCreators = {
  storeCampaignPost,
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps, actionCreators)(TextSubmissionAction);
