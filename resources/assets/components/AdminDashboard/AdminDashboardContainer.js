import { connect } from 'react-redux';
import AdminDashboard from './AdminDashboard';

const mapStateToProps = state => ({
  cacheId: `campaign_${state.campaign.slug}`,
});

export default connect(mapStateToProps)(AdminDashboard);
