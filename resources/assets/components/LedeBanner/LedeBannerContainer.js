import get from 'lodash/get';
import { connect } from 'react-redux';

import LedeBanner from './LedeBanner';
import { isSignedUp } from '../../selectors/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => ({
  affiliatedActionText: get(
    state,
    'campaign.additionalContent.affiliatedActionText',
    null,
  ),
  affiliatedActionLink: get(
    state,
    'campaign.additionalContent.affiliatedActionLink',
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
    null,
  ),

  affiliateOptInContent: state.campaign.affiliateOptInContent,
  affiliateSponsors: state.campaign.affiliateSponsors,
  // @TODO: We won't need this blurb property once MosaicTemplate is retired.
  blurb: get(props, 'blurb', state.campaign.blurb),
  campaignId: state.campaign.campaignId,
  coverImage: get(props, 'coverImage', state.campaign.coverImage),
  content: state.campaign.blurb,
  dashboard: state.campaign.dashboard,
  endDate: state.campaign.endDate,
  featureFlagUseLegacyTemplate: get(
    state,
    'campaign.additionalContent.featureFlagUseLegacyTemplate',
  ),
  isAffiliated: isSignedUp(state),
  scholarshipAmount: state.campaign.scholarshipAmount,
  scholarshipDeadline: state.campaign.scholarshipDeadline,
  subtitle: get(props, 'subtitle', state.campaign.callToAction),
  title: get(props, 'title', state.campaign.title),
});

// Export the container component.
export default connect(mapStateToProps)(LedeBanner);
