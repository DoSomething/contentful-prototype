/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import LedeBanner from '../../LedeBanner/LedeBanner';
import CallToActionContainer from '../../CallToAction/CallToActionContainer';
import Markdown from '../../Markdown';
import Card from '../../Card';

import './landing-page.scss';

const LandingPage = (props) => {
  const {
    affiliateSponsors, blurb, coverImage, endDate, isAffiliated,
    legacyCampaignId, pitchContent, sidebar, showPartnerMsgOptIn,
    signupArrowContent, subtitle, tagline, template, title,
  } = props;

  // Grab the first Sidebar element, assuming here that we only want to be setting one sidebar
  const sidebarCTA = sidebar[0].fields;

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
      />

      <Enclosure className="default-container margin-lg pitch-landing-page campaign-subpage">
        <div className="primary">
          <Markdown>{ pitchContent }</Markdown>
        </div>
        <div className="secondary">
          <Card title={sidebarCTA.title} className="rounded bordered" >
            <Markdown className="padded" >{ sidebarCTA.content }</Markdown>
          </Card>
        </div>
      </Enclosure>

      <CallToActionContainer
        actionText="Sign up"
        className="legacy border-top border-radius-none bg-off-white padding-lg"
        content={tagline}
      />


      <div className="info-bar -dark">
        <div className="wrapper">A DoSomething.org campaign. Join over 5.5 million members taking action. Any cause, anytime, anywhere.</div>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  blurb: PropTypes.string.isRequired,
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
  sidebar: PropTypes.arrayOf(PropTypes.object).isRequired,
};

LandingPage.defaultProps = {
  endDate: null,
  isAffiliated: false,
  tagline: 'Ready to start?',
  signupArrowContent: null,
  showPartnerMsgOptIn: false,
};

export default LandingPage;
