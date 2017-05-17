import PropTypes from 'prop-types';
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
      competitions={props.competitions}
    />
  </div>
);

Chrome.propTypes = {
  isAffiliated: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  totalCampaignSignups: PropTypes.number.isRequired,
  dashboard: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endDate: PropTypes.shape({
    date: PropTypes.string,
    timezone: PropTypes.string,
    timezone_type: PropTypes.number,
  }).isRequired,
  children: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  signups: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  competitions: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

Chrome.defaultProps = {
  isAffiliated: false,
};

export default Chrome;
