import { connect } from 'react-redux';
import SurveyModal from '../configurations/SurveyModal';

const mapStateToProps = state => ({
  northstarId: state.user.id,
  campaignId: state.campaign.id,
  legacyCampaignId: state.campaign.legacyCampaignId,
});

export default connect(mapStateToProps)(SurveyModal);
