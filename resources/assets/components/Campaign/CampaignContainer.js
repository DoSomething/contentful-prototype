import { get } from 'lodash';
import { connect } from 'react-redux';

import Campaign from './Campaign';
import { getUserId, isAuthenticated } from '../../selectors/user';

const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  isAuthenticated: isAuthenticated(state),
  userId: getUserId(state),
});

export default connect(mapStateToProps)(Campaign);
