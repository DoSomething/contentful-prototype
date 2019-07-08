/* eslint-disable react/no-array-index-key */

import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import PitchTemplate from './templates/PitchTemplate';
import MarqueeTemplate from './templates/MarqueeTemplate';

import './landing-page.scss';

const LandingPage = props => {
  const {
    additionalContent,
    campaignId,
    campaignTitle,
    content,
    coverImage,
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
    <React.Fragment>
      {get(additionalContent, 'sixpackLandingPageMarqueeTemplate', false) ? (
        <MarqueeTemplate
          campaignId={campaignId}
          campaignTitle={campaignTitle}
          coverImage={coverImage}
          tagline={tagline}
        />
      ) : (
        <PitchTemplate
          additionalContent={additionalContent}
          campaignId={campaignId}
          campaignTitle={campaignTitle}
          content={content}
          scholarshipAmount={scholarshipAmount}
          scholarshipDeadline={scholarshipDeadline}
          showPartnerMsgOptIn={showPartnerMsgOptIn}
          sidebarCTA={sidebarCTA}
          signupArrowContent={signupArrowContent}
          tagline={tagline}
        />
      )}
    </React.Fragment>
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
