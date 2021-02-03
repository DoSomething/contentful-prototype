import get from 'lodash/get';
import { connect } from 'react-redux';

import CampaignBanner from './CampaignBanner';
import { isSignedUp } from '../../selectors/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => ({
  actionIdToDisplay: get(
    state,
    'campaign.additionalContent.actionIdToDisplay',
    null,
  ),
  affiliateCreditText: get(
    state,
    'campaign.additionalContent.affiliateCreditText',
    undefined,
  ),
  numberOfScholarships: get(
    state,
    'campaign.additionalContent.numberOfScholarships',
    undefined,
  ),
  affiliateSponsors: state.campaign.affiliateSponsors,
  campaignId: state.campaign.campaignId,
  coverImage: get(props, 'coverImage', state.campaign.coverImage),
  content: state.campaign.blurb,
  dashboard: state.campaign.dashboard,
  endDate: state.campaign.endDate,
  isAffiliated: isSignedUp(state),
  scholarshipAmount: state.campaign.scholarshipAmount,
  scholarshipCallToAction: state.campaign.scholarshipCallToAction,
  scholarshipDeadline: state.campaign.scholarshipDeadline,
  scholarshipDescription: state.campaign.scholarshipDescription,
  subtitle: get(props, 'subtitle', state.campaign.callToAction),
  title: get(props, 'title', state.campaign.title),
});

// Export the container component.
export default connect(mapStateToProps)(CampaignBanner);
