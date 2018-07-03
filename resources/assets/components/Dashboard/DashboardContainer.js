import { connect } from 'react-redux';

import Dashboard from './index';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  content: state.campaign.dashboard,
  endDate: state.campaign.endDate,
});

// Export the container component.
export default connect(mapStateToProps)(Dashboard);
