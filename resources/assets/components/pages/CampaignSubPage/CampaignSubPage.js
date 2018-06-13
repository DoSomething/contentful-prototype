import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import ContentfulEntry from '../../ContentfulEntry';
import { CallToActionContainer } from '../../CallToAction';
import CampaignSubPageContent from './CampaignSubPageContent';
import DashboardContainer from '../../Dashboard/DashboardContainer';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

import './campaign-subpage.scss';

/**
 * Render the page & chrome.
 *
 * @returns {XML}
 */
const CampaignSubPage = props => {
  // @TODO: after Action page migration, determine a better solution (Page has own gate toggle? etc).
  const displaySignup = !props.json ? true : false; // eslint-disable-line no-unneeded-ternary

  return (
    <div>
      <LedeBannerContainer displaySignup={displaySignup} />
      <div className="main clearfix">
        {props.dashboard ? <DashboardContainer /> : null}

        {!props.json ? <CampaignPageNavigationContainer /> : null}

        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          {/* @TODO: after Action page migration, refactor and combine CampaignPage & CampaignSubPage and render Contentful Entry within CampaignPage component */}
          {!props.json ? (
            <CampaignSubPageContent {...props} />
          ) : (
            <ContentfulEntry json={props.json} />
          )}
        </Enclosure>
        <CallToActionContainer sticky hideIfSignedUp />
      </div>
    </div>
  );
};

CampaignSubPage.propTypes = {
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  json: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

CampaignSubPage.defaultProps = {
  dashboard: null,
  json: null,
};

export default CampaignSubPage;
