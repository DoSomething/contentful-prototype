import React from 'react';
import Config from './Config';
import Dashboard from './Dashboard';
import FeedEnclosure from './FeedEnclosure';
import LedeBanner from './LedeBanner';
import NavigationContainer from '../containers/NavigationContainer';
import AffirmationContainer from '../containers/AffirmationContainer';
import NotificationContainer from '../containers/NotificationContainer';

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
    <Dashboard
      totalCampaignSignups={props.totalCampaignSignups}
      content={props.dashboard}
      endDate={props.endDate}
    />
    <AffirmationContainer />
    <NavigationContainer />
    <FeedEnclosure>
      {props.children}
    </FeedEnclosure>
    <Config
      user={props.user}
      signups={props.signups}
    />
  </div>
);

export default Chrome;
