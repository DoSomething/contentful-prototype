import { connect } from 'react-redux';

import LinkAction from './LinkAction';
import { withoutNulls } from '../../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state =>
  withoutNulls({
    campaignId: state.campaign.campaignId,
    pageId: state.campaign.id || state.page.id,
    source: state.user.source,
  });

// Export the container component.
export default connect(mapStateToProps)(LinkAction);
