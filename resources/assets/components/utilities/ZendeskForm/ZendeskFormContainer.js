import { connect } from 'react-redux';

import ZendeskForm from './ZendeskForm';
import { isSignedUp } from '../../../selectors/signup';
import { getCampaignFaqPath } from '../../../helpers/campaign';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  campaignName: state.campaign.title,
  // @TODO: utilize the campaign signups GraphQL query (https://git.io/JJZ62) within the component to determine affiliation status
  // instead of the Redux store once we can refactor that into using an @include Directive for the group field. (https://bit.ly/2ZCMIzx).
  faqLink: isSignedUp(state) ? getCampaignFaqPath() : undefined,
});

// Export the container component.
export default connect(mapStateToProps)(ZendeskForm);
