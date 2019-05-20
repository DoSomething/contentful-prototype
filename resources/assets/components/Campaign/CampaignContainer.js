import { get } from 'lodash';
import { connect } from 'react-redux';

import Campaign from './Campaign';
import { getUserId, isAuthenticated } from '../../selectors/user';

const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  featureFlags: get(state.campaign.additionalContent, 'featureFlags'),
  isAuthenticated: isAuthenticated(state),
  userId: getUserId(state),
});

export default connect(mapStateToProps)(Campaign);
