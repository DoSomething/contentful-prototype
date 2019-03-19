import { connect } from 'react-redux';

import { getUserId } from '../../../selectors/user';
import SubmissionGalleryBlockQuery from './SubmissionGalleryBlockQuery';

/**
 * Provide state from the Redux store as props for this component. (In this
 * case, we just need the campaign ID and user ID for our GraphQL query!)
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  userId: getUserId(state),
});

// Export the Redux container component.
export default connect(mapStateToProps)(SubmissionGalleryBlockQuery);
