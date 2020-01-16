import { get } from 'lodash';
import { connect } from 'react-redux';

import CampaignInfoBar from './CampaignInfoBar';
import { isSignedUp } from '../../selectors/signup';

const mapStateToProps = state => {
  return {
    affiliateCreditText: get(
      state,
      'campaign.additionalContent.affiliateCreditText',
      undefined,
    ),
    affiliateSponsors: state.campaign.affiliateSponsors,
    affiliatePartners: state.campaign.affiliatePartners,
    contactEmail: get(state, 'campaign.campaignLead.fields.email', undefined),
    isAffiliated: isSignedUp(state),
  };
};

export default connect(mapStateToProps)(CampaignInfoBar);
