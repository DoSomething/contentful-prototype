import { connect } from 'react-redux';

import Campaign from './Campaign';

const mapStateToProps = state => ({
  isAffiliated: state.signups.thisCampaign,
  useLandingPage: state.campaign.landingPage !== null,
  userRole: state.user.role,
});

export default connect(mapStateToProps)(Campaign);
