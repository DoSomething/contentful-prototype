import { connect } from 'react-redux';

import HomePage from './HomePage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => state.homePage.fields;

// Export the container component.
export default connect(mapStateToProps)(HomePage);
