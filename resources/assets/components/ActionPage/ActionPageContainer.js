import { connect } from 'react-redux';
import ActionPage from './ActionPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  steps: state.campaign.actionSteps,
  signedUp: state.signups.thisCampaign,
});

// Export the container component.
export default connect(mapStateToProps)(ActionPage);
