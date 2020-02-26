import { get } from 'lodash';
import { connect } from 'react-redux';

import CampaignInfoBar from './CampaignInfoBar';

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
    campaignTitle: get(state, 'campaign.title'),
  };
};

export default connect(mapStateToProps)(CampaignInfoBar);
