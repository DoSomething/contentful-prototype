import { connect } from 'react-redux';
import { get } from 'lodash';

import CallToAction from './CallToAction';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => ({
  campaignId: state.campaign.id,
  coverImageUrl: state.campaign.coverImage.url,
  isSignedUp: state.signups.thisCampaign,
  legacyCampaignId: get(state.campaign, 'legacyCampaignId', null),
  tagline: state.campaign.callToAction,
  actionText: ownProps.actionText || state.campaign.actionText,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(CallToAction);
