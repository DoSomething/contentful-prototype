import { connect } from 'react-redux';

import CampaignInfo from './CampaignInfo';
/**
 * Provide state from the Redux store as props for this component. (In
 * this case, we just need the campaign ID for our GraphQL query!)
 */
const mapStateToProps = state => ({
  campaignId: String(state.campaign.campaignId),
});

// Export the Redux container component.
export default connect(mapStateToProps)(CampaignInfo);
