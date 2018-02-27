import { get } from 'lodash';
import { connect } from 'react-redux';

import CampaignSubPage from './CampaignSubPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => ({
  pages: state.campaign.pages,
  dashboard: state.campaign.dashboard,
  route: ownProps.match.params,
  noun: get(state.campaign.additionalContent, 'noun'),
  verb: get(state.campaign.additionalContent, 'verb'),
  tagline: get(state.campaign.additionalContent, 'tagline'),
  title: state.campaign.title,
  campaignEndDate: get(state.campaign.endDate, 'date', null),
});

// Export the container component.
export default connect(mapStateToProps)(CampaignSubPage);
