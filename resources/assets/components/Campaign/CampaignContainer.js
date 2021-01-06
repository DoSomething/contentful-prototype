import { connect } from 'react-redux';

import Campaign from './Campaign';
import { getUserId, isAuthenticated } from '../../helpers/auth';

const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  isAuthenticated: isAuthenticated(),
  userId: getUserId(),
});

export default connect(mapStateToProps)(Campaign);
