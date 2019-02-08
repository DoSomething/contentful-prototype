import { connect } from 'react-redux';

import CompanyPage from './CompanyPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => state.page.fields;

// Export the container component.
export default connect(mapStateToProps)(CompanyPage);
