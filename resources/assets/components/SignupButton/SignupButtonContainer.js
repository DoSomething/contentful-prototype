import { get } from 'lodash';
import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';
import { clickedSignUp } from '../../actions/signup';
import { convertExperiment } from '../../actions';
import SignupButton from './SignupButton';


/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  template: state.campaign.template,
  experiments: state.experiments,
  actionText: state.campaign.actionText,
  legacyCampaignId: state.campaign.legacyCampaignId,
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
