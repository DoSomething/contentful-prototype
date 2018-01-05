import { get } from 'lodash';
import { connect } from 'react-redux';

import PhotoHeader from './PhotoHeader';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  themeColor: get(state.campaign.additionalContent, 'themeColor'),
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(PhotoHeader);
