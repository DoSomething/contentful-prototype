import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pitch from '../components/Pitch';
import { clickedSignUp } from '../actions';

const mapStateToProps = state => ({
  enableBackgroundTest: state.campaign.additionalContent.enableBackgroundTest,
  campaignId: state.campaign.legacyCampaignId,
  totalCampaignSignups: state.signups.total,
});

const actionCreators = {
  clickedSignUp,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Pitch));
