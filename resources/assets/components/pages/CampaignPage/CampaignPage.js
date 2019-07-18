import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import ContentfulEntry from '../../ContentfulEntry';
import CampaignPageContent from './CampaignPageContent';
import { CallToActionContainer } from '../../CallToAction';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignInfoBar from '../../utilities/CampaignInfoBar/CampaignInfoBar';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

import './campaign-page.scss';

/**
 * Render the page & chrome.
 *
 * @returns {XML}
 */
const CampaignPage = props => {
  const {
    affiliateCreditText,
    affiliateSponsors,
    affiliatePartners,
    campaignLead,
    dashboard,
    entryContent,
    isCampaignClosed,
  } = props;

  return (
    <React.Fragment>
      <LedeBannerContainer displaySignup={Boolean(!entryContent)} />

      <div className="main clearfix">
        {dashboard ? <ContentfulEntry json={dashboard} /> : null}

        {!isCampaignClosed && !entryContent ? (
          <CampaignPageNavigationContainer />
        ) : null}

        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          {/* @TODO: after Action page migration, refactor and combine CampaignPage & CampaignSubPage and render Contentful Entry within CampaignPage component */}
          {!entryContent ? (
            <CampaignPageContent {...props} />
          ) : (
            <ContentfulEntry json={entryContent} />
          )}
        </Enclosure>
        {!entryContent ? <CallToActionContainer sticky hideIfSignedUp /> : null}
      </div>

      <CampaignInfoBar
        affiliateCreditText={affiliateCreditText}
        affiliateSponsors={affiliateSponsors}
        affiliatePartners={affiliatePartners}
        contactEmail={campaignLead.email || undefined}
      />
    </React.Fragment>
  );
};

CampaignPage.propTypes = {
  affiliateCreditText: PropTypes.string,
  affiliatePartners: PropTypes.arrayOf(PropTypes.object),
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  campaignLead: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  entryContent: PropTypes.object,
  isCampaignClosed: PropTypes.bool,
  landingPage: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  shouldShowLandingPage: PropTypes.bool.isRequired,
};

CampaignPage.defaultProps = {
  affiliateCreditText: undefined,
  affiliatePartners: [],
  affiliateSponsors: [],
  campaignLead: {},
  dashboard: null,
  entryContent: null,
  isCampaignClosed: false,
  landingPage: null,
};

export default CampaignPage;
