import { connect } from 'react-redux';

import CampaignDashboard from './CampaignDashboard';
import {
  clickedShowLandingPage,
  clickedShowActionPage,
} from '../../../actions/admin';
import {
  clickedShowAffirmation,
  signupCreated,
  clickedRemoveSignUp,
} from '../../../actions/signup';
import { isSignedUp } from '../../../selectors/signup';

const mapStateToProps = state => {
  const hasLandingPage = state.campaign.landingPage !== null;

  return {
    slug: state.campaign.slug,
    campaignId: state.campaign.campaignId,
    hasLandingPage,
    isSignedUp: isSignedUp(state),
  };
};

const actionCreators = {
  clickedShowAffirmation,
  clickedShowLandingPage,
  clickedShowActionPage,
  signupCreated,
  clickedRemoveSignUp,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(CampaignDashboard);
