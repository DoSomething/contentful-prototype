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
  const { dashboard, entryContent, isCampaignClosed } = props;

  return (
    <React.Fragment>
      <LedeBannerContainer displaySignup={Boolean(!entryContent)} />

      <div className="main clearfix">
        {dashboard ? <ContentfulEntry json={dashboard} /> : null}

        {!isCampaignClosed && !entryContent ? (
          <CampaignPageNavigationContainer />
        ) : null}

        <Enclosure className="md:w-3/4 mx-auto margin-top-lg margin-bottom-lg">
          {/* @TODO: after Action page migration, refactor and combine CampaignPage & CampaignSubPage and render Contentful Entry within CampaignPage component */}
          {!entryContent ? (
            <CampaignPageContent {...props} />
          ) : (
            <ContentfulEntry json={entryContent} />
          )}
        </Enclosure>
        {!entryContent ? <CallToActionContainer sticky hideIfSignedUp /> : null}
      </div>

      <CampaignInfoBarContainer />
    </React.Fragment>
  );
};

CampaignPage.propTypes = {
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
  shouldShowSchoolFinder: PropTypes.bool.isRequired,
};

CampaignPage.defaultProps = {
  dashboard: null,
  entryContent: null,
  isCampaignClosed: false,
  landingPage: null,
};

export default CampaignPage;
