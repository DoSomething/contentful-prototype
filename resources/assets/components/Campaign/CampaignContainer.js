import { connect } from 'react-redux';
import { get } from 'lodash';

import Campaign from './Campaign';

const mapStateToProps = state => ({
  featureFlags: get(state.campaign.additionalContent, 'featureFlags'),
});

export default connect(mapStateToProps)(Campaign);
