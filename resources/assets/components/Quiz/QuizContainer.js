import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Quiz from './Quiz';
import { storeCampaignSignup } from '../../actions/signup';
import { isAuthenticated } from '../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  isAuthenticated: isAuthenticated(state),
  pageId: state.campaign.id || state.page.id,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  storeCampaignSignup,
};

export default withRouter(
  connect(
    mapStateToProps,
    actionCreators,
  )(Quiz),
);
