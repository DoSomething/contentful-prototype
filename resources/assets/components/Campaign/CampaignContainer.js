import { connect } from 'react-redux';

import Campaign from './Campaign';

const mapStateToProps = (state) => {
  const hasLandingPage = state.campaign.landingPage !== null;
  const isSignedUp = state.signups.thisCampaign;

  const shouldShowLandingPage = hasLandingPage &&
    (! isSignedUp || state.admin.shouldShowLandingPage) &&
    ! state.admin.shouldShowActionPage;

  return {
    shouldShowLandingPage,
  };
};

export default connect(mapStateToProps)(Campaign);
