import PropTypes from 'prop-types';
import React from 'react';
import AppInit from './AppInit';
import Dashboard from './Dashboard';
import Debugger from './Debugger';
import FeedEnclosure from './FeedEnclosure';
import LedeBanner from './LedeBanner/LedeBanner';
import LedeBannerAltB from './LedeBanner/LedeBannerAltB';
import LedeBannerAltC from './LedeBanner/LedeBannerAltC';
import LedeBannerAltD from './LedeBanner/LedeBannerAltD';
import ExperimentContainer from '../containers/ExperimentContainer';
import NavigationContainer from '../containers/NavigationContainer';
import AffirmationContainer from '../containers/AffirmationContainer';
import NotificationContainer from '../containers/NotificationContainer';

// @TODO: Might be useful to have a separate file of constants?
const LEDE_BANNER_QUAD_BUTTONS = 'lede_banner_quad_buttons';

const Chrome = props => (
  <div>
    <AppInit />
    <NotificationContainer />
    <ExperimentContainer name={LEDE_BANNER_QUAD_BUTTONS}>
      <LedeBanner
        experiment={LEDE_BANNER_QUAD_BUTTONS}
        alternative="one_button_join"
        convert={props.convertExperiment}
        isAffiliated={props.isAffiliated}
        title={props.title}
        subtitle={props.subtitle}
        blurb={props.blurb}
        coverImage={props.coverImage}
        legacyCampaignId={props.legacyCampaignId}
        clickedSignUp={props.clickedSignUp}
      />
      <LedeBannerAltB
        experiment={LEDE_BANNER_QUAD_BUTTONS}
        alternative="one_button_make"
        convert={props.convertExperiment}
        isAffiliated={props.isAffiliated}
        title={props.title}
        subtitle={props.subtitle}
        blurb={props.blurb}
        coverImage={props.coverImage}
        legacyCampaignId={props.legacyCampaignId}
        clickedSignUp={props.clickedSignUp}
        noun={props.noun}
        verb={props.verb}
      />
      <LedeBannerAltC
        experiment={LEDE_BANNER_QUAD_BUTTONS}
        alternative="two_button_stand"
        convert={props.convertExperiment}
        isAffiliated={props.isAffiliated}
        title={props.title}
        subtitle={props.subtitle}
        blurb={props.blurb}
        coverImage={props.coverImage}
        legacyCampaignId={props.legacyCampaignId}
        clickedSignUp={props.clickedSignUp}
        noun={props.noun}
        verb={props.verb}
      />
      <LedeBannerAltD
        experiment={LEDE_BANNER_QUAD_BUTTONS}
        alternative="two_button_sign"
        convert={props.convertExperiment}
        isAffiliated={props.isAffiliated}
        title={props.title}
        subtitle={props.subtitle}
        blurb={props.blurb}
        coverImage={props.coverImage}
        legacyCampaignId={props.legacyCampaignId}
        clickedSignUp={props.clickedSignUp}
        noun={props.noun}
        verb={props.verb}
      />
    </ExperimentContainer>
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
  blurb: PropTypes.string.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  competitions: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  convertExperiment: PropTypes.func.isRequired,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  dashboard: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endDate: PropTypes.shape({
    date: PropTypes.string,
    timezone: PropTypes.string,
    timezone_type: PropTypes.number,
  }).isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
  isAffiliated: PropTypes.bool,
  signups: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  totalCampaignSignups: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  verb: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
};

Chrome.defaultProps = {
  isAffiliated: false,
  noun: { singular: 'action', plural: 'action' },
  verb: { singular: 'take', plural: 'take' },
};

export default Chrome;
