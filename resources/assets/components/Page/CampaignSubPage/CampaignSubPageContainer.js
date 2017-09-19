import { connect } from 'react-redux';
import { get } from 'lodash';
import CampaignSubPage from './CampaignSubPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => ({
  pages: state.campaign.pages,
  route: ownProps.match.params,
  noun: get(state.campaign.additionalContent, 'noun'),
  verb: get(state.campaign.additionalContent, 'verb'),
  tagline: get(state.campaign.additionalContent, 'tagline'),
  title: state.campaign.title,
});

// Export the container component.
export default connect(mapStateToProps)(CampaignSubPage);
