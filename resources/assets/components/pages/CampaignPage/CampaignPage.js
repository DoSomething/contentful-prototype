import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import ContentfulEntry from '../../ContentfulEntry';
import { CallToActionContainer } from '../../CallToAction';
import CampaignPageContent from './CampaignPageContent';
import DashboardContainer from '../../Dashboard/DashboardContainer';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

import './campaign-page.scss';

/**
 * Render the page & chrome.
 *
 * @returns {XML}
 */
const CampaignPage = props => (
  <div>
    <LedeBannerContainer displaySignup={Boolean(!props.entryContent)} />
    <div className="main clearfix">
      {props.dashboard ? <DashboardContainer /> : null}

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

CampaignPage.propTypes = {
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  entryContent: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

CampaignPage.defaultProps = {
  dashboard: null,
  entryContent: null,
};

export default CampaignPage;
