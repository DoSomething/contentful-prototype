import { connect } from 'react-redux';

import Campaign from './Campaign';
import { clickedShowAffirmation, signupCreated, clickedRemoveSignUp } from '../../actions/signup';
import { clickedShowLandingPage, clickedShowActionPage } from '../../actions/admin';

const mapStateToProps = (state) => {
  const isSignedUp = state.signups.thisCampaign;
  const shouldShowActionPage = state.admin.shouldShowActionPage;
  const hasLandingPage = state.campaign.landingPage !== null;

  const shouldShowLandingPage = hasLandingPage &&
    (! isSignedUp || state.admin.shouldShowLandingPage) &&
    ! shouldShowActionPage;

  return {
    slug: state.campaign.slug,
    hasLandingPage,
    isSignedUp,
    shouldShowLandingPage,
  };
};

const actionCreators = {
  clickedShowAffirmation,
  clickedShowLandingPage,
  clickedShowActionPage,
  signupCreated,
  clickedRemoveSignUp,
};

export default connect(mapStateToProps, actionCreators)(Campaign);
