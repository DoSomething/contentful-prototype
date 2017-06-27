import { connect } from 'react-redux';
import { get } from 'lodash';
import CallToActionBlock from '../components/CallToActionBlock';
import { clickedSignUp, convertExperiment } from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  isAffiliated: state.signups.thisCampaign,
  imageUrl: state.campaign.coverImage.url,
  campaignId: state.campaign.legacyCampaignId,
  noun: get(state.campaign.additionalContent, 'noun'),
  verb: get(state.campaign.additionalContent, 'verb'),
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
export default connect(mapStateToProps, actionCreators)(CallToActionBlock);
