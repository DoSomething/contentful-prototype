import { connect } from 'react-redux';

import CtaReferralPageBanner from './CtaReferralPageBanner';

const mapStateToProps = state => ({
  campaignId: String(state.campaign.campaignId),
});

export default connect(mapStateToProps)(CtaReferralPageBanner);
