import get from 'lodash/get';
import { connect } from 'react-redux';

import CampaignRoute from './CampaignRoute';
import { clickedHideAffirmation } from '../../../actions';
import { isCampaignSignUpInState } from '../../../selectors/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  affirmation: state.campaign.affirmation,
  endDate: state.campaign.endDate,
  hasCommunityPage: Boolean(
    state.campaign.pages.find(
      page => page.type === 'page' && page.fields.slug.endsWith('community'),
    ),
  ),
  isSignedUp: isCampaignSignUpInState(state),
  landingPage: get(state.campaign, 'landingPage', null),
  shouldShowAffirmation: state.signups.shouldShowAffirmation,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const mapActionsToProps = {
  clickedHideAffirmation,
};

/**
 * Export the container component.
 */
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(CampaignRoute);
