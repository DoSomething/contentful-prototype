import { connect } from 'react-redux';

import SurveyModal from './SurveyModal';
import { getUserId } from '../../../selectors/user';

const mapStateToProps = state => ({
  northstarId: getUserId(state),
  campaignId: state.campaign.campaignId,
});

export default connect(mapStateToProps)(SurveyModal);
