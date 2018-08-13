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
  blurb: state.campaign.blurb,
  coverImage: get(props, 'coverImage', state.campaign.coverImage),
  endDate: state.campaign.endDate,
  isAffiliated: isSignedUp(state),
  affiliateSponsors: state.campaign.affiliateSponsors,
  subtitle: get(props, 'subtitle', state.campaign.callToAction),
  template: get(props, 'template', state.campaign.template),
  title: get(props, 'title', state.campaign.title),
});

// Export the container component.
export default connect(mapStateToProps)(LedeBanner);
