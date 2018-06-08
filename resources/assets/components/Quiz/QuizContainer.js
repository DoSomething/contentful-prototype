import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PuckConnector } from '@dosomething/puck-client';

import Quiz from './Quiz';
import { clickedSignUp } from '../../actions/signup';
import { isAuthenticated } from '../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  legacyCampaignId: state.campaign.legacyCampaignId,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedSignUp,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(PuckConnector(Quiz)),
);
