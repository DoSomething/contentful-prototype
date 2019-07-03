/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import Enclosure from '../../Enclosure';
import PitchTemplate from './templates/PitchTemplate';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CallToActionContainer from '../../CallToAction/CallToActionContainer';

import './landing-page.scss';

const LandingPage = props => {
  const {
    additionalContent,
    campaignId,
    campaignTitle,
    content,
    scholarshipAmount,
    scholarshipDeadline,
    showPartnerMsgOptIn,
    sidebar,
    signupArrowContent,
    tagline,
  } = props;

  // @TODO: allow outputting multiple blocks in the sidebar.
  const sidebarCTA = sidebar[0] && sidebar[0].fields;

  return (
    <div>
      <LedeBannerContainer
        signupArrowContent={signupArrowContent}
        showPartnerMsgOptIn={showPartnerMsgOptIn}
      />

      <div className="clearfix bg-white">
        <Enclosure className="default-container margin-lg pitch-landing-page">
          <PitchTemplate
            additionalContent={additionalContent}
            campaignId={campaignId}
            campaignTitle={campaignTitle}
            content={content}
            sidebarCTA={sidebarCTA}
            scholarshipAmount={scholarshipAmount}
            scholarshipDeadline={scholarshipDeadline}
          />
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
  additionalContent: PropTypes.object,
  campaignId: PropTypes.string.isRequired,
  campaignTitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  showPartnerMsgOptIn: PropTypes.bool,
  sidebar: PropTypes.arrayOf(PropTypes.object),
  signupArrowContent: PropTypes.string,
  tagline: PropTypes.string,
};

LandingPage.defaultProps = {
  additionalContent: null,
  scholarshipAmount: null,
  scholarshipDeadline: null,
  showPartnerMsgOptIn: false,
  sidebar: null,
  signupArrowContent: null,
  tagline: 'Ready to start?',
};

export default LandingPage;
