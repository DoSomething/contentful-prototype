import { connect } from 'react-redux';

import ZendeskForm from './ZendeskForm';
import { getUserToken } from '../../../selectors/user';
import { getCampaignFaqPath } from '../../../helpers/campaign';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  token: getUserToken(state),
  campaignId: state.campaign.campaignId,
  campaignName: state.campaign.title,
  faqLink: getCampaignFaqPath(),
});

// Export the container component.
export default connect(mapStateToProps)(ZendeskForm);
