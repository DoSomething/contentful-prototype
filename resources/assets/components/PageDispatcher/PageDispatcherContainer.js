import { connect } from 'react-redux';

import PageDispatcher from './PageDispatcher';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  type: state.page.type,
});

// Export the container component.
export default connect(mapStateToProps)(PageDispatcher);
