import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isSignedUp } from '../../selectors/signup';
import { isCampaignClosed } from '../../helpers/campaign';
import CampaignPageNavigation from './CampaignPageNavigation';

const mapStateToProps = state => ({
  isAffiliated: isSignedUp(state),
  isCampaignClosed: isCampaignClosed(state.campaign.endDate),
  pages: state.campaign.pages,
  campaignSlug: state.campaign.slug,
});

export default withRouter(connect(mapStateToProps)(CampaignPageNavigation));
