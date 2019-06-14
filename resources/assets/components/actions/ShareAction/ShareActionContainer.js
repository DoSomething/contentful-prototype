import { isArray } from 'lodash';
import { connect } from 'react-redux';

import ShareAction from './ShareAction';
import { getUserId, isAuthenticated } from '../../../selectors/user';
import { storeCampaignPost } from '../../../actions/post';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  // Support Array or String value. (This should be an Array until we update the Contentful field (https://git.io/fjzkh)).
  // @TODO: Clean this up when we update the field to return a String.
  const socialPlatform = isArray(ownProps.socialPlatform)
    ? ownProps.socialPlatform[0]
    : ownProps.socialPlatform;

  return {
    campaignId: state.campaign.campaignId,
    isAuthenticated: isAuthenticated(state),
    pageId: state.campaign.id,
    socialPlatform: socialPlatform || 'facebook',
    userId: getUserId(state),
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  storeCampaignPost,
};

// Export the container component.
export default connect(
  mapStateToProps,
  actionCreators,
)(ShareAction);
