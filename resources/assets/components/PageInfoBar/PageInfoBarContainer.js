import { get } from 'lodash';
import { connect } from 'react-redux';

import PageInfoBar from './PageInfoBar';

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
    pageTitle: get(state, 'campaign.title', 'Campaign'),
  };
};

export default connect(mapStateToProps)(PageInfoBar);
