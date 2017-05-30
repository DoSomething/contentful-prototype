import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pitch from '../components/Pitch';

const mapStateToProps = state => ({
  campaignId: state.campaign.legacyCampaignId,
});

const actionCreators = {};

export default withRouter(connect(mapStateToProps, actionCreators)(Pitch));
