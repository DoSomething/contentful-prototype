import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignInfoBar from '../../utilities/CampaignInfoBar/CampaignInfoBar';

const CampaignClosedPage = props => {
  const {
    affiliateCreditText,
    affiliatePartners,
    affiliateSponsors,
    campaignLead,
    endDate,
  } = props;
  return (
    <div>
      <LedeBannerContainer displaySignup={false} />

      <div className="main clearfix">
        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          <h1>Great work!</h1>
          <p>
            This campaign closed on{' '}
            {format(endDate, 'MMMM do, yyyy', {
              awareOfUnicodeTokens: true,
            })}
            . Thank you to all the members who participated and the incredible
            impact you made!
          </p>
        </Enclosure>
      </div>

      <CampaignInfoBar
        affiliateCreditText={affiliateCreditText}
        affiliateSponsors={affiliateSponsors}
        affiliatePartners={affiliatePartners}
        contactEmail={campaignLead.email || undefined}
      />
    </div>
  );
};

CampaignClosedPage.propTypes = {
  affiliateCreditText: PropTypes.string,
  affiliatePartners: PropTypes.arrayOf(PropTypes.object),
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  campaignLead: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  endDate: PropTypes.string.isRequired,
};

CampaignClosedPage.defaultProps = {
  affiliateCreditText: undefined,
  affiliatePartners: [],
  affiliateSponsors: [],
  campaignLead: {},
};

export default CampaignClosedPage;
