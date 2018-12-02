import { connect } from 'react-redux';

import LinkAction from './LinkAction';
import { withoutNulls } from '../../../helpers';
import { getUserId } from '../../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state =>
  withoutNulls({
    userId: getUserId(state),
    campaignId: state.campaign.campaignId,
    source: state.user.source,
  });

// Export the container component.
export default connect(mapStateToProps)(LinkAction);
