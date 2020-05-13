import { get } from 'lodash';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';
import { isCampaignClosed } from '../../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => ({
  isCampaignClosed: isCampaignClosed(state.campaign.endDate),
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(LandingPage);
