import { connect } from 'react-redux';

import GeneralPage from './GeneralPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => ({
  pages: state.campaign.pages,
  route: ownProps.match.params,
});

// Export the container component.
export default connect(mapStateToProps)(GeneralPage);
