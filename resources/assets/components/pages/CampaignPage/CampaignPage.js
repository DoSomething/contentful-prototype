import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import ContentfulEntry from '../../ContentfulEntry';
import CampaignPageContent from './CampaignPageContent';
import { CallToActionContainer } from '../../CallToAction';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import LandingPageContainer from '../LandingPage/LandingPageContainer';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

import './campaign-page.scss';

/**
 * Render the page & chrome.
 *
 * @returns {XML}
 */
const CampaignPage = props => {
  // @TODO: temporary fucntion to select component to use based on type.
  // Will be removed once all landing pages use the LandingPage content type.
  const landingPageComponent = () =>
    props.landingPage.type === 'page' ? (
      <LandingPageContainer {...props} />
    ) : (
      <ContentfulEntry json={props.landingPage} />
    );

  return props.shouldShowLandingPage ? (
    landingPageComponent()
  ) : (
    <div>
      <LedeBannerContainer displaySignup={Boolean(!props.entryContent)} />
      <div className="main clearfix">
        {props.dashboard ? <ContentfulEntry json={props.dashboard} /> : null}

        {!props.entryContent ? <CampaignPageNavigationContainer /> : null}

        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          {/* @TODO: after Action page migration, refactor and combine CampaignPage & CampaignSubPage and render Contentful Entry within CampaignPage component */}
          {!props.entryContent ? (
            <CampaignPageContent {...props} />
          ) : (
            <ContentfulEntry json={props.entryContent} />
          )}
        </Enclosure>
        {!props.entryContent ? (
          <CallToActionContainer sticky hideIfSignedUp />
        ) : null}
      </div>
    </div>
  );
};

CampaignPage.propTypes = {
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  entryContent: PropTypes.object,
  landingPage: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  shouldShowLandingPage: PropTypes.bool.isRequired,
};

CampaignPage.defaultProps = {
  dashboard: null,
  entryContent: null,
  landingPage: null,
};

export default CampaignPage;
