import { connect } from 'react-redux';

import CampaignInfoBlock from './CampaignInfoBlock';
/**
 * Provide state from the Redux store as props for this component. (In
 * this case, we just need the campaign ID for our GraphQL query!)
 */
const mapStateToProps = state => ({
  campaignId: parseInt(state.campaign.campaignId, 10),
});

// Export the Redux container component.
export default connect(mapStateToProps)(CampaignInfoBlock);
