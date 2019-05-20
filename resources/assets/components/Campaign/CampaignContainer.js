import { connect } from 'react-redux';
import { get } from 'lodash';

import Campaign from './Campaign';
import { getUserId } from '../../selectors/user';

const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  featureFlags: get(state.campaign.additionalContent, 'featureFlags'),
  userId: getUserId(state),
});

export default connect(mapStateToProps)(Campaign);
