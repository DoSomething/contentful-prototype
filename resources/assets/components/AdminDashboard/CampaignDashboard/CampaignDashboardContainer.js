import { connect } from 'react-redux';

import CampaignDashboard from './CampaignDashboard';
import { clickedShowLandingPage, clickedShowActionPage } from '../../../actions/admin';
import { clickedShowAffirmation, signupCreated, clickedRemoveSignUp } from '../../../actions/signup';
import { toggleReportbackAffirmation } from '../../../actions/reportback';

const mapStateToProps = (state) => {
  const isSignedUp = state.signups.thisCampaign;
  const hasLandingPage = state.campaign.landingPage !== null;

  return {
    slug: state.campaign.slug,
    hasLandingPage,
    isSignedUp,
  };
};

const actionCreators = {
  clickedShowAffirmation,
  clickedShowLandingPage,
  clickedShowActionPage,
  signupCreated,
  clickedRemoveSignUp,
  toggleReportbackAffirmation,
};

export default connect(mapStateToProps, actionCreators)(CampaignDashboard);
