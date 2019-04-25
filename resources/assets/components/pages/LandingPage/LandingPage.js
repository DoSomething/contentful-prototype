/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import Enclosure from '../../Enclosure';
import PitchTemplate from './templates/PitchTemplate';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CallToActionContainer from '../../CallToAction/CallToActionContainer';
import SixpackExperimentContainer from '../../utilities/SixpackExperiment/SixpackExperimentContainer';

import './landing-page.scss';

const LandingPage = props => {
  const {
    campaignId,
    content,
    showPartnerMsgOptIn,
    sidebar,
    signupArrowContent,
    tagline,
  } = props;

  // @TODO: allow outputting multiple blocks in the sidebar.
  const sidebarCTA = sidebar[0] && sidebar[0].fields;

  return (
    <div>
      {campaignId === '3pwxnRZxociqMaQCMcGOyc' ||
      campaignId === '2YnPcG3G8EgAmWOAC48aWU' ? (
        <SixpackExperimentContainer
          title="LedeBanner Layout Experiment"
          convertableActions={['signup']}
          alternatives={[
            <LedeBannerContainer testName="Mosaic Layout Template" />,
            <LedeBannerContainer
              testName="Jumbo Layout Template"
              coverImage={{
                url:
                  'https://images.ctfassets.net/81iqaqpfd8fy/6TaMCndXygSscGkOWKg6uY/155753d51b7f0278fb3a2fd9d592901b/VoterRegIllustration.png',
              }}
              template="jumbo"
            />,
          ]}
        />
      ) : (
        <LedeBannerContainer
          signupArrowContent={signupArrowContent}
          showPartnerMsgOptIn={showPartnerMsgOptIn}
        />
      )}

      <div className="clearfix bg-white">
        <Enclosure className="default-container margin-lg pitch-landing-page">
          <PitchTemplate content={content} sidebarCTA={sidebarCTA} />
        </Enclosure>

        <CallToActionContainer content={tagline} sticky />
      </div>

      <PuckWaypoint name="landing_page_cta-top" />
      <CallToActionContainer
        className="legacy border-top border-radius-none bg-off-white padding-lg hide-on-mobile"
        content={tagline}
      />
      <PuckWaypoint name="landing_page_cta-bottom" />

      <div className="info-bar -dark">
        <div className="wrapper">
          A DoSomething.org campaign. Join millions of young people transforming
          their communities. Let&#39;s Do This!
        </div>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  campaignId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  showPartnerMsgOptIn: PropTypes.bool,
  sidebar: PropTypes.arrayOf(PropTypes.object),
  signupArrowContent: PropTypes.string,
  tagline: PropTypes.string,
};

LandingPage.defaultProps = {
  showPartnerMsgOptIn: false,
  sidebar: null,
  signupArrowContent: null,
  tagline: 'Ready to start?',
};

export default LandingPage;
