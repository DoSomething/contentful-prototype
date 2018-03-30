import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';
import { get } from 'lodash';

import SignupButton from './SignupButton';
import { convertExperiment } from '../../actions';
import { clickedSignUp } from '../../actions/signup';


/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignActionText: state.campaign.actionText,
  disableSignup: get(state.campaign, 'additionalContent.disableSignup', false),
  experiments: state.experiments,
  legacyCampaignId: state.campaign.legacyCampaignId,
  sourceActionText: get(state.campaign, 'additionalContent.sourceActionText'),
  template: state.campaign.template,
  trafficSource: state.user.source,
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
