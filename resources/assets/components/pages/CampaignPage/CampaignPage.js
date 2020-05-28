import React from 'react';
import PropTypes from 'prop-types';

import CampaignPageContent from './CampaignPageContent';
import { CallToActionContainer } from '../../CallToAction';
import PageInfoBarContainer from '../../PageInfoBar/PageInfoBarContainer';
import CampaignBannerContainer from '../../CampaignBanner/CampaignBannerContainer';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

const CampaignPage = props => {
  const { isCampaignClosed, quizEntry } = props;

  return (
    <>
      <article className="campaign-page bg-white">
        <CampaignBannerContainer />

        <div className="clearfix relative">
          {quizEntry ? (
            <div className="my-6">
              <div className="base-12-grid py-3 md:py-6">
                <ContentfulEntryLoader
                  className="grid-wide"
                  id={quizEntry.id}
                />
              </div>
            </div>
          ) : (
            <>
              {!isCampaignClosed ? <CampaignPageNavigationContainer /> : null}

              <div className="my-6">
                <CampaignPageContent {...props} />
              </div>

              <CallToActionContainer className="md:hidden" hideIfSignedUp />
            </>
          )}
        </div>
      </article>

      <PageInfoBarContainer />
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
