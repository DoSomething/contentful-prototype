import { connect } from 'react-redux';

import { isSignedUp } from '../../../selectors/signup';
import LegacyCampaignDashboard from './LegacyCampaignDashboard';
import {
  clickedShowAffirmation,
  signupCreated,
  clickedRemoveSignUp,
} from '../../../actions/signup';

const mapStateToProps = state => ({
  slug: state.campaign.slug,
  campaignId: state.campaign.campaignId,
  isSignedUp: isSignedUp(state),
});

const actionCreators = {
  clickedShowAffirmation,
  signupCreated,
  clickedRemoveSignUp,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(LegacyCampaignDashboard);
