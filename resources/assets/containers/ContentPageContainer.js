import React from 'react';
import ContentPage from '../components/ContentPage';
import { connect } from 'react-redux'

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => ({
  pages: state.campaign.pages,
  route: ownProps.params,
});

// Export the container component.
export default connect(mapStateToProps)(ContentPage);
