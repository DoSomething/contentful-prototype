/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import Enclosure from '../../Enclosure';
import PitchTemplate from './templates/PitchTemplate';
import CallToActionContainer from '../../CallToAction/CallToActionContainer';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';

import './landing-page.scss';

const LandingPage = (props) => {
  const { pitchContent, sidebar, tagline } = props;

  const sidebarCTA = sidebar[0] && sidebar[0].fields;

  return (
    <div>
      <LedeBannerContainer />

      <div className="clearfix bg-white">
        <Enclosure className="default-container margin-lg pitch-landing-page">
          <PitchTemplate pitchContent={pitchContent} sidebarCTA={sidebarCTA} />
        </Enclosure>
      </div>

      <PuckWaypoint name="landing_page_cta-top" />
      <CallToActionContainer
        className="legacy border-top border-radius-none bg-off-white padding-lg"
        content={tagline}
      />
      <PuckWaypoint name="landing_page_cta-bottom" />

      <div className="info-bar -dark">
        <div className="wrapper">A DoSomething.org campaign. Join over 5.5 million members taking action. Any cause, anytime, anywhere.</div>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  pitchContent: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  sidebar: PropTypes.arrayOf(PropTypes.object),
};

LandingPage.defaultProps = {
  tagline: 'Ready to start?',
  sidebar: null,
};

export default LandingPage;
