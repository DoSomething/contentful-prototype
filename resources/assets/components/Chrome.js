import React from 'react';
import FeedEnclosure from './FeedEnclosure';
import LedeBanner from './LedeBanner';
import NavigationContainer from '../containers/NavigationContainer';
import AffirmationContainer from '../containers/AffirmationContainer';
import NotificationContainer from '../containers/NotificationContainer';
import DashboardContainer from '../containers/DashboardContainer';

const Chrome = (props) => (
  <div>
    <NotificationContainer />
    <LedeBanner
      isAffiliated={props.isAffiliated}
      title={props.title}
      subtitle={props.subtitle}
      blurb={props.blurb}
      coverImage={props.coverImage}
      legacyCampaignId={props.legacyCampaignId}
      clickedSignUp={props.clickedSignUp}
    />
    <DashboardContainer />
    <AffirmationContainer />
    <NavigationContainer />
    <FeedEnclosure>
      {props.children}
    </FeedEnclosure>
  </div>
);

export default Chrome;
