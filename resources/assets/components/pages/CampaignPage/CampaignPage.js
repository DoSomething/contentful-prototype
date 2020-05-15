import React from 'react';
import PropTypes from 'prop-types';

import CampaignPageContent from './CampaignPageContent';
import { CallToActionContainer } from '../../CallToAction';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignInfoBarContainer from '../../CampaignInfoBar/CampaignInfoBarContainer';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

import './campaign-page.scss';

/**
 * Render the page & chrome.
 *
 * @returns {XML}
 */
const CampaignPage = props => {
  const { quizEntry, isCampaignClosed } = props;

  return (
    <>
      <article className="campaign-page bg-white">
        <LedeBannerContainer />

        <div className="clearfix relative">
          {!isCampaignClosed && !quizEntry ? (
            <CampaignPageNavigationContainer />
          ) : null}

          <div className="my-6">
            {quizEntry ? (
              <div className="base-12-grid py-3 md:py-6">
                <ContentfulEntryLoader
                  className="grid-wide"
                  id={quizEntry.id}
                />
              </div>
            ) : (
              <CampaignPageContent {...props} />
            )}
          </div>

          {!quizEntry ? (
            <CallToActionContainer className="md:hidden" hideIfSignedUp />
          ) : null}
        </div>
      </article>

      <CampaignInfoBarContainer />
    </>
  );
};

CampaignPage.propTypes = {
  isCampaignClosed: PropTypes.bool.isRequired,
  quizEntry: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

CampaignPage.defaultProps = {
  quizEntry: null,
};

export default CampaignPage;
