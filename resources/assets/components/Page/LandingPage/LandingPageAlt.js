/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import LedeBanner from '../../LedeBanner/LedeBanner';
import CallToActionContainer from '../../CallToAction/CallToActionContainer';
import Markdown from '../../Markdown';
import Block from '../../Block';

import './landing-page.scss';

const LandingPage = (props) => {
  const {
    affiliateSponsors, blurb, coverImage, ctaTitle, ctaContent, endDate,
    isAffiliated, legacyCampaignId, pitchContent, showPartnerMsgOptIn,
    signupArrowContent, subtitle, tagline, template, title,
  } = props;

  const defaultPitchContent = '### The Problem \nMenthol cigarettes are easier to start, more addictive, and harder to quit. And every other flavored cigarette was banned years ago because of how they appealed to young, first-time smokers(the flavor masks the harshness of the smoke). Menthols should’ve gotten the boot, too.\n### The Solution\nThe FDA missed an opportunity to ban menthols in 2011. Why has it taken them six years to ban menthol when every other flavored cigarette is banned? Call on the FDA to right their regret and ban menthols now.\n> some cool content shall dwell within.\n We all regret something from the past six years, but the FDA should definitely regret missing the opportunity to ban menthols. Tweet your big regret since 2011 using #MyBigRegret and ask the FDA about theirs, tagging @FDATobacco. Then, urge friends to sign a petition telling the FDA to ban menthols NOW.';
  const defaultCtaTitle = 'What you get';
  const defaultCtaContent = 'You could win a $5,000 dollar scholarship!';

  const blockJson = {
    type: 'static',
    fields: { title: ctaTitle || defaultCtaTitle, content: ctaContent || defaultCtaContent },
  };

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
          <Markdown>{ pitchContent || defaultPitchContent }</Markdown>
        </div>
        <div className="secondary">
          <Block json={blockJson} />
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
  ctaTitle: PropTypes.string,
  ctaContent: PropTypes.string,
};

LandingPage.defaultProps = {
  endDate: null,
  isAffiliated: false,
  tagline: 'Ready to start?',
  signupArrowContent: null,
  showPartnerMsgOptIn: false,
  ctaTitle: null,
  ctaContent: null,
};

export default LandingPage;
