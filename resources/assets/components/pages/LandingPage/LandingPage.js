/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

import PitchTemplate from './templates/PitchTemplate';
import MarqueeTemplate from './templates/MarqueeTemplate';

import './landing-page.scss';

const LandingPage = props => {
  const {
    additionalContent,
    affiliateCreditText,
    affiliateSponsors,
    affiliateOptInContent,
    campaignId,
    content,
    coverImage,
    endDate,
    scholarshipAmount,
    scholarshipDeadline,
    showPartnerMsgOptIn,
    sidebar,
    signupArrowContent,
    subtitle,
    tagline,
    title,
    featureFlagUseLegacyTemplate,
  } = props;

  // @TODO: allow outputting multiple blocks in the sidebar.
  const sidebarCTA = sidebar[0] && sidebar[0].fields;

  return (
    <React.Fragment>
      {featureFlagUseLegacyTemplate ? (
        <PitchTemplate
          additionalContent={additionalContent}
          campaignId={campaignId}
          content={content}
          scholarshipAmount={scholarshipAmount}
          scholarshipDeadline={scholarshipDeadline}
          showPartnerMsgOptIn={showPartnerMsgOptIn}
          sidebarCTA={sidebarCTA}
          signupArrowContent={signupArrowContent}
          tagline={tagline}
          title={title}
        />
      ) : (
        <MarqueeTemplate
          additionalContent={additionalContent}
          affiliateCreditText={affiliateCreditText}
          affiliateSponsors={affiliateSponsors}
          affiliateOptInContent={affiliateOptInContent}
          content={content}
          coverImage={coverImage}
          endDate={endDate}
          scholarshipAmount={scholarshipAmount}
          scholarshipDeadline={scholarshipDeadline}
          subtitle={subtitle}
          title={title}
        />
      )}
    </React.Fragment>
  );
};

LandingPage.propTypes = {
  additionalContent: PropTypes.object,
  affiliateCreditText: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliateOptInContent: PropTypes.object,
  campaignId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  coverImage: PropTypes.object.isRequired,
  endDate: PropTypes.string,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  showPartnerMsgOptIn: PropTypes.bool,
  sidebar: PropTypes.arrayOf(PropTypes.object),
  signupArrowContent: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  title: PropTypes.string.isRequired,
  featureFlagUseLegacyTemplate: PropTypes.bool,
};

LandingPage.defaultProps = {
  additionalContent: null,
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  affiliateOptInContent: null,
  endDate: null,
  scholarshipAmount: null,
  scholarshipDeadline: null,
  showPartnerMsgOptIn: false,
  sidebar: null,
  signupArrowContent: null,
  tagline: 'Ready to start?',
  featureFlagUseLegacyTemplate: false,
};

export default LandingPage;
