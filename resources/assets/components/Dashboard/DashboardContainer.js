import { connect } from 'react-redux';

import Dashboard from './index';
import { getTotalSignups } from '../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  legacyCampaignId: state.campaign.legacyCampaignId,
  totalCampaignSignups: state.signups.total,
  content: state.campaign.dashboard,
  endDate: state.campaign.endDate,
});

/**
 * Bind Redux actions as props.
 */
const actionCreators = {
  getTotalSignups,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(Dashboard);
