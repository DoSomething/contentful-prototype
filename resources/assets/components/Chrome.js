import React from 'react';
import Dashboard from './Dashboard';
import Debugger from './Debugger';
import FeedEnclosure from './FeedEnclosure';
import LedeBanner from './LedeBanner';
import NavigationContainer from '../containers/NavigationContainer';
import AffirmationContainer from '../containers/AffirmationContainer';
import NotificationContainer from '../containers/NotificationContainer';

const Chrome = props => (
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
    <Debugger
      user={props.user}
      signups={props.signups}
    />
  </div>
);

Chrome.propTypes = {
  isAffiliated: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  blurb: React.PropTypes.string.isRequired,
  coverImage: React.PropTypes.shape({
    description: React.PropTypes.string,
    url: React.PropTypes.string,
  }).isRequired,
  legacyCampaignId: React.PropTypes.string.isRequired,
  clickedSignUp: React.PropTypes.func.isRequired,
  totalCampaignSignups: React.PropTypes.number.isRequired,
  dashboard: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endDate: React.PropTypes.shape({
    date: React.PropTypes.string,
    timezone: React.PropTypes.string,
    timezone_type: React.PropTypes.number,
  }).isRequired,
  children: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    role: React.PropTypes.string,
  }).isRequired,
  signups: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

Chrome.defaultProps = {
  isAffiliated: false,
};

export default Chrome;
