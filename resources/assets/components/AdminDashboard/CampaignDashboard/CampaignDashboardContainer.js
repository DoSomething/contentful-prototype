import { connect } from 'react-redux';
import { get } from 'lodash';

import CampaignDashboard from './CampaignDashboard';
import { clickedShowLandingPage, clickedShowActionPage } from '../../../actions/admin';
import { clickedShowAffirmation, signupCreated, clickedRemoveSignUp } from '../../../actions/signup';
import { toggleReportbackAffirmation } from '../../../actions/reportback';

const mapStateToProps = (state) => {
  const isSignedUp = state.signups.thisCampaign;
  const hasLandingPage = state.campaign.landingPage !== null;
  const hasReferralRB = get(state.campaign.additionalContent, 'referralRB', false);
  debugger

  return {
    slug: state.campaign.slug,
    hasReferralRB,
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
