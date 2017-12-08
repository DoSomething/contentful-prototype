import { connect } from 'react-redux';
import SurveyModal from '../configurations/SurveyModal';
import { getUserId } from '../../../selectors/user';

const mapStateToProps = state => ({
  northstarId: getUserId(state),
  campaignId: state.campaign.id,
  legacyCampaignId: state.campaign.legacyCampaignId,
});

export default connect(mapStateToProps)(SurveyModal);
