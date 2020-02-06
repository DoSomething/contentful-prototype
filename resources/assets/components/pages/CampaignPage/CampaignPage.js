import React from 'react';
import PropTypes from 'prop-types';

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
    <>
      <article className="campaign-page bg-white">
        <LedeBannerContainer
          displaySignupButton={Boolean(!entryContent)}
          isClosed={isCampaignClosed}
        />

        <div className="clearfix relative">
          {!isCampaignClosed && !entryContent ? (
            <CampaignPageNavigationContainer />
          ) : null}

          <div className="md:w-3/4 mx-auto my-6">
            <CampaignPageContent {...props} />
          </div>

          {!entryContent ? (
            <CallToActionContainer className="md:hidden" hideIfSignedUp />
          ) : null}
        </div>
      </article>

      <CampaignInfoBarContainer />
    </>
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
