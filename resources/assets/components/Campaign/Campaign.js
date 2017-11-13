/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import ModalSwitch from '../Modal';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import NotificationContainer from '../Notification';
import AdminDashboardContainer from '../AdminDashboard';

const Campaign = (props) => {
  const { hasLandingPage, slug, clickedShowAffirmation, clickedShowLandingPage,
    shouldShowLandingPage } = props;

  return (
    <div>
      <AdminDashboardContainer>
        <a className="button -secondary margin-horizontal-md" href={`/next/cache/campaign_${slug}?redirect=${window.location.pathname}`}>
          Clear Cache
        </a>
        <button className="button -secondary margin-horizontal-md" onClick={clickedShowAffirmation}>
          Show Affirmation
        </button>
        { hasLandingPage ?
          <button className="button -secondary margin-horizontal-md" onClick={clickedShowLandingPage}>
            Show Landing Page
          </button>
          : null}
      </AdminDashboardContainer>
      <NotificationContainer />
      <ModalSwitch />

      { shouldShowLandingPage ?
        <LandingPageContainer {...props} />
        :
        <CampaignPageContainer {...props} />}
    </div>
  );
};

Campaign.propTypes = {
  hasLandingPage: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  clickedShowAffirmation: PropTypes.func.isRequired,
  clickedShowLandingPage: PropTypes.func.isRequired,
  shouldShowLandingPage: PropTypes.bool,
};

Campaign.defaultProps = {
  hasLandingPage: false,
  shouldShowLandingPage: false,
};

export default Campaign;
