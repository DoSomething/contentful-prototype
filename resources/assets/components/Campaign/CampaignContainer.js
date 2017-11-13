import { connect } from 'react-redux';

import Campaign from './Campaign';
import { clickedShowAffirmation } from '../../actions/signup';
import { clickedShowLandingPage } from '../../actions/admin';

const mapStateToProps = (state) => {
  const isSignedUp = state.signups.thisCampaign;
  const hasLandingPage = state.campaign.landingPage !== null;

  const shouldShowLandingPage = hasLandingPage &&
    (! isSignedUp || state.admin.shouldShowLandingPage);

  return {
    slug: state.campaign.slug,
    hasLandingPage,
    shouldShowLandingPage,
  };
};

const actionCreators = {
  clickedShowAffirmation,
  clickedShowLandingPage,
};

export default connect(mapStateToProps, actionCreators)(Campaign);
