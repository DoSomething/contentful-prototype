import { connect } from 'react-redux';
import { get } from 'lodash';

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
import { userHasRole } from '../../../selectors/user';
import { isSignedUp } from '../../../selectors/signup';

const mapStateToProps = state => {
  const hasLandingPage = state.campaign.landingPage !== null;
  const hasReferralRB = get(
    state.campaign.additionalContent,
    'referralRB',
    false,
  );

  return {
    slug: state.campaign.slug,
    campaignId: state.campaign.legacyCampaignId,
    hasReferralRB,
    hasLandingPage,
    isSignedUp: isSignedUp(state),
    isAdmin: userHasRole(state, ['admin']),
  };
};

const actionCreators = {
  clickedShowAffirmation,
  clickedShowLandingPage,
  clickedShowActionPage,
  signupCreated,
  clickedRemoveSignUp,
};

export default connect(mapStateToProps, actionCreators)(CampaignDashboard);
