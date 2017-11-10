import { connect } from 'react-redux';

import Campaign from './Campaign';
import { clickedShowAffirmation } from '../../actions/signup';

const mapStateToProps = state => ({
  isAffiliated: state.signups.thisCampaign,
  useLandingPage: state.campaign.landingPage !== null,
  slug: state.campaign.slug,
});

const actionCreators = {
  clickedShowAffirmation,
};

export default connect(mapStateToProps, actionCreators)(Campaign);
