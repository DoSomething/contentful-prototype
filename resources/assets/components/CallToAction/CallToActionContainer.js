import { connect } from 'react-redux';

import CallToAction from './CallToAction';
import { isSignedUp } from '../../selectors/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  coverImageUrl: state.campaign.coverImage.url,
  isSignedUp: isSignedUp(state),
  tagline: state.campaign.callToAction,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(CallToAction);
