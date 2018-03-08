import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';

import SignupButton from './SignupButton';
import { convertExperiment } from '../../actions';
import { clickedSignUp } from '../../actions/signup';


/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignActionText: state.campaign.actionText,
  experiments: state.experiments,
  legacyCampaignId: state.campaign.legacyCampaignId,
  template: state.campaign.template,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedSignUp,
  convertExperiment,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(PuckConnector(SignupButton));
