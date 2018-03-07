import { connect } from 'react-redux';

import CallToAction from './CallToAction';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.id,
  coverImageUrl: state.campaign.coverImage.url,
  isSignedUp: state.signups.thisCampaign,
  legacyCampaignId: state.campaign.legacyCampaignId,
  tagline: state.campaign.callToAction,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(CallToAction);
