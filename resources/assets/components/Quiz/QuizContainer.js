import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';

import Quiz from './Quiz';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  dashboard: state.campaign.dashboard,
});

// Export the container component.
export default connect(mapStateToProps)(PuckConnector(Quiz));
