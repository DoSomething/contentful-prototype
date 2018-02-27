import get from 'lodash/get';
import { connect } from 'react-redux';

import LedeBanner from './LedeBanner';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  actionText: state.campaign.actionText,
  affiliatedActionText: get(state, 'campaign.additionalContent.affiliatedActionText', null),
  affiliatedActionLink: get(state, 'campaign.additionalContent.affiliatedActionLink', null),
  blurb: state.campaign.blurb,
  coverImage: state.campaign.coverImage,
  endDate: state.campaign.endDate,
  isAffiliated: state.signups.thisCampaign,
  affiliateSponsors: state.campaign.affiliateSponsors,
  legacyCampaignId: state.campaign.legacyCampaignId,
  subtitle: state.campaign.callToAction,
  template: state.campaign.template,
  title: state.campaign.title,
});

// Export the container component.
export default connect(mapStateToProps)(LedeBanner);
