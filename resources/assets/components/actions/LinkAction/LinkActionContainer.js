import { connect } from 'react-redux';

import LinkAction from './LinkAction';
import { withoutNulls } from '../../../helpers';
import { getUserId } from '../../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state =>
  withoutNulls({
    campaignId: state.campaign.campaignId,
    pageId: state.campaign.id,
    source: state.user.source,
    userId: getUserId(state),
  });

// Export the container component.
export default connect(mapStateToProps)(LinkAction);
