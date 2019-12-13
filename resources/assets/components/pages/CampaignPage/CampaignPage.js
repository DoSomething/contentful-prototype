import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import ContentfulEntry from '../../ContentfulEntry';
import CampaignPageContent from './CampaignPageContent';
import { CallToActionContainer } from '../../CallToAction';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignInfoBarContainer from '../../CampaignInfoBar/CampaignInfoBarContainer';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

import './campaign-page.scss';

/**
 * Render the page & chrome.
 *
 * @returns {XML}
 */
const CampaignPage = props => {
  const { entryContent, isCampaignClosed } = props;

  return (
    <React.Fragment>
      <LedeBannerContainer
        displaySignupButton={Boolean(!entryContent)}
        isClosed={isCampaignClosed}
      />

      <div className="main clearfix">
        {!isCampaignClosed && !entryContent ? (
          <CampaignPageNavigationContainer />
        ) : null}

        <Enclosure className="md:w-3/4 mx-auto mt-6 mb-6">
          {/* @TODO: after Action page migration, refactor and combine CampaignPage & CampaignSubPage and render Contentful Entry within CampaignPage component */}
          {!entryContent ? (
            <CampaignPageContent {...props} />
          ) : (
            <ContentfulEntry json={entryContent} />
          )}
        </Enclosure>
        {!entryContent ? (
          <CallToActionContainer className="md:hidden" hideIfSignedUp />
        ) : null}
      </div>

      <CampaignInfoBarContainer />
    </React.Fragment>
  );
};

CampaignPage.propTypes = {
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
  entryContent: null,
  isCampaignClosed: false,
  landingPage: null,
};

export default CampaignPage;
