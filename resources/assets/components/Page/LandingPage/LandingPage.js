/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import Enclosure from '../../Enclosure';
import LedeBanner from '../../LedeBanner/LedeBanner';
import PitchTemplate from './templates/PitchTemplate';
import CallToActionContainer from '../../CallToAction/CallToActionContainer';

import './landing-page.scss';

const LandingPage = (props) => {
  const {
    actionText, affiliateSponsors, blurb, coverImage,
    endDate, isAffiliated, legacyCampaignId, pitchContent,
    sidebar, showPartnerMsgOptIn, signupArrowContent,
    subtitle, tagline, template, title,
  } = props;

  const sidebarCTA = sidebar[0] && sidebar[0].fields;

  return (
    <div>
      <LedeBanner
        isAffiliated={isAffiliated}
        title={title}
        subtitle={subtitle}
        blurb={blurb}
        coverImage={coverImage}
        legacyCampaignId={legacyCampaignId}
        endDate={endDate}
        template={template}
        affiliateSponsors={affiliateSponsors}
        signupArrowContent={signupArrowContent}
        showPartnerMsgOptIn={showPartnerMsgOptIn}
        actionText={actionText}
      />

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
  actionText: PropTypes.string.isRequired,
  blurb: PropTypes.string,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  endDate: PropTypes.shape({
    date: PropTypes.string,
    timezone: PropTypes.string,
    timezone_type: PropTypes.number,
  }),
  isAffiliated: PropTypes.bool,
  affiliateSponsors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  legacyCampaignId: PropTypes.string.isRequired,
  pitchContent: PropTypes.string.isRequired,
  showPartnerMsgOptIn: PropTypes.bool,
  signupArrowContent: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  template: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sidebar: PropTypes.arrayOf(PropTypes.object),
};

LandingPage.defaultProps = {
  blurb: null,
  endDate: null,
  isAffiliated: false,
  tagline: 'Ready to start?',
  signupArrowContent: null,
  showPartnerMsgOptIn: false,
  sidebar: null,
};

export default LandingPage;
