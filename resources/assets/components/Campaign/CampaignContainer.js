import { connect } from 'react-redux';

import Campaign from './Campaign';
import { clickedShowAffirmation } from '../../actions/signup';
import clickedShowLandingPage from '../../actions/admin';

const mapStateToProps = (state) => {
  const shouldShowLandingPage = ! state.signups.thisCampaign || state.admin.shouldShowLandingPage;

  return {
    useLandingPage: state.campaign.landingPage !== null,
    slug: state.campaign.slug,
    shouldShowLandingPage,
  };
};

const actionCreators = {
  clickedShowAffirmation,
  clickedShowLandingPage,
};

export default connect(mapStateToProps, actionCreators)(Campaign);
