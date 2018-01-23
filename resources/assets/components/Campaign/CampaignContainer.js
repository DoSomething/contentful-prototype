import { connect } from 'react-redux';

import Campaign from './Campaign';

const mapStateToProps = (state, props) => {
  const hasLandingPage = state.campaign.landingPage !== null;
  const isSignedUp = state.signups.thisCampaign;

  const { location, match } = props;
  const isQuiz = location.pathname.replace(match.url, '').startsWith('/quiz/');

  const blockLandingPage = state.admin.shouldShowActionPage || isQuiz;
  let shouldShowLandingPage = false;

  if (state.admin.shouldShowLandingPage) {
    shouldShowLandingPage = true;
  } else if (hasLandingPage && ! blockLandingPage) {
    shouldShowLandingPage = ! isSignedUp;
  }

  return {
    shouldShowLandingPage,
  };
};

export default connect(mapStateToProps)(Campaign);
