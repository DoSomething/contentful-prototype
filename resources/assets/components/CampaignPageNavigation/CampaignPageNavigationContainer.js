import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isCampaignClosed } from '../../helpers';
import CampaignPageNavigation from './CampaignPageNavigation';

const mapStateToProps = state => ({
  hasCommunityPage: Boolean(state.campaign.activityFeed.length),
  isAffiliated: state.signups.thisCampaign,
  isCampaignClosed: isCampaignClosed(get(state.campaign.endDate, 'date', null)),
  isLegacyTemplate: Boolean(state.campaign.template === 'legacy'),
  pages: state.campaign.pages,
  campaignSlug: state.campaign.slug,
});

export default withRouter(connect(mapStateToProps)(CampaignPageNavigation));
