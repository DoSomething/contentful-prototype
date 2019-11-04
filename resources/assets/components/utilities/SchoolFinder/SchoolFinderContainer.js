import { connect } from 'react-redux';

import SchoolFinder from './SchoolFinder';
import { getUserId } from '../../../selectors/user';

const mapStateToProps = state => ({
  campaignId: String(state.campaign.campaignId),
  userId: getUserId(state),
});

export default connect(mapStateToProps)(SchoolFinder);
