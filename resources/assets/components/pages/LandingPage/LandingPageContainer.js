import { get } from 'lodash';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';
import { isCampaignClosed } from '../../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  // @TODO: while we have landing pages as either a page content type
  // or a landingPage content type, the ownProps is structured a bit
  // differently. Revise once all landing pages use landingPage type.
  const landingPage = get(ownProps, 'landingPage.fields', ownProps);

  return {
    isCampaignClosed: isCampaignClosed(state.campaign.endDate),
    sidebar: landingPage.sidebar,
  };
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(LandingPage);
