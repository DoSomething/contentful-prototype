import { connect } from 'react-redux';
import CallToAction from './CallToAction';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.legacyCampaignId,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(CallToAction);
