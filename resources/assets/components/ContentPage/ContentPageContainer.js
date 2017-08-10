import { connect } from 'react-redux';
import { get } from 'lodash';
import ContentPage from './ContentPage';
import { isCampaignClosed as isCampaignClosedHelper } from '../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => ({
  pages: state.campaign.pages,
  route: ownProps.match.params,
  noun: get(state.campaign.additionalContent, 'noun'),
  verb: get(state.campaign.additionalContent, 'verb'),
  tagline: get(state.campaign.additionalContent, 'tagline'),
  isCampaignClosed: isCampaignClosedHelper(state.campaign.endDate.date),
});

// Export the container component.
export default connect(mapStateToProps)(ContentPage);
