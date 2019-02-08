import { connect } from 'react-redux';

import PageDispatcher from './PageDispatcher';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => state.page;

// Export the container component.
export default connect(mapStateToProps)(PageDispatcher);
