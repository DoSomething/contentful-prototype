import { connect } from 'react-redux';

import CtaReferralPageBanner from './CtaReferralPageBanner';

const mapStateToProps = state => ({
  campaignId: String(state.campaign.campaignId),
  campaignWebsiteId: state.campaign.id,
  displayReferralPage: state.campaign.displayReferralPage,
});

export default connect(mapStateToProps)(CtaReferralPageBanner);
