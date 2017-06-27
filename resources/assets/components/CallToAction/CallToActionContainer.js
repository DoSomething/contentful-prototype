import { connect } from 'react-redux';
import CallToAction from './CallToAction';
import { clickedSignUp } from '../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.legacyCampaignId,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const mapDispatchToProps = {
  clickedSignUp,
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(CallToAction);
