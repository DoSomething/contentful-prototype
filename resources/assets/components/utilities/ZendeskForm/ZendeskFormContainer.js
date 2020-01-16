import { connect } from 'react-redux';

import ZendeskForm from './ZendeskForm';
import { getUserToken } from '../../../selectors/user';
import { getCampaignFaqsPath } from '../../../selectors/campaign';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  token: getUserToken(state),
  campaignName: state.campaign.title,
  faqsLink: getCampaignFaqsPath(state),
});

// Export the container component.
export default connect(mapStateToProps)(ZendeskForm);
