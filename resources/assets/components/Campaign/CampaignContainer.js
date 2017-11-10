import { connect } from 'react-redux';

import Campaign from './Campaign';

const mapStateToProps = state => ({
  isAffiliated: state.signups.thisCampaign,
  useLandingPage: state.campaign.landingPage !== null,
  slug: state.campaign.slug,
});

export default connect(mapStateToProps)(Campaign);
