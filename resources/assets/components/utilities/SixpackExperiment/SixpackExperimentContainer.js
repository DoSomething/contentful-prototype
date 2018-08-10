import { get } from 'lodash';
import { connect } from 'react-redux';

import SixpackExperiment from './SixpackExperiment';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignSlug: get(state.campaign, 'slug', null),
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(SixpackExperiment);
