import { connect } from 'react-redux';

import SixpackExperiment from './SixpackExperiment';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.id,
  slug: state.campaign.slug,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(SixpackExperiment);
