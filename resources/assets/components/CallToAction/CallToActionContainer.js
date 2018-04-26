import { connect } from 'react-redux';

import CallToAction from './CallToAction';
import { isSignedUp } from '../../selectors/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.id,
  coverImageUrl: state.campaign.coverImage.url,
  isSignedUp: isSignedUp(state),
  legacyCampaignId: state.campaign.legacyCampaignId,
  tagline: state.campaign.callToAction,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(CallToAction);
