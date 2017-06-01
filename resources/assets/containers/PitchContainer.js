import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pitch from '../components/Pitch';
import { clickedSignUp, convertExperiment } from '../actions';

const mapStateToProps = state => ({
  campaignId: state.campaign.legacyCampaignId,
  totalCampaignSignups: state.signups.total,
});

const actionCreators = {
  clickedSignUp,
  convertExperiment,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Pitch));
