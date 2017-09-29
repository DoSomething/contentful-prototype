import { connect } from 'react-redux';
import { get } from 'lodash';
import CallToActionBlock from './CallToActionBlock';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => ({
  isAffiliated: state.signups.thisCampaign,
  imageUrl: state.campaign.coverImage.url,
  campaignId: state.campaign.legacyCampaignId,
  noun: get(state.campaign.additionalContent, 'noun'),
  verb: get(state.campaign.additionalContent, 'verb'),
  fields: props.fields,
});

// Export the container component.
export default connect(mapStateToProps)(CallToActionBlock);
