import { connect } from 'react-redux';
import PostGallery from './PostGallery';
import { fetchReportbacks } from '../../actions';

const mapStateToProps = state => ({
  legacyCampaignId: state.campaign.legacyCampaignId,
  reportbacks: state.reportbacks,
});

const mapActionsToProps = {
  fetchReportbacks,
};

export default connect(mapStateToProps, mapActionsToProps)(PostGallery);
