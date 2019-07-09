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
  } = props;

  // @TODO: allow outputting multiple blocks in the sidebar.
  const sidebarCTA = sidebar[0] && sidebar[0].fields;

  return (
    <React.Fragment>
      {get(additionalContent, 'sixpackLandingPageMarqueeTemplate', false) ? (
        <MarqueeTemplate
          campaignId={campaignId}
          content={content}
          coverImage={coverImage}
          endDate={endDate}
          subtitle={subtitle}
          tagline={tagline}
          title={title}
        />
      ) : (
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
      )}
    </React.Fragment>
  );
};

LandingPage.propTypes = {
  additionalContent: PropTypes.object,
  campaignId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  showPartnerMsgOptIn: PropTypes.bool,
  sidebar: PropTypes.arrayOf(PropTypes.object),
  signupArrowContent: PropTypes.string,
  tagline: PropTypes.string,
  title: PropTypes.string.isRequired,
};

LandingPage.defaultProps = {
  additionalContent: null,
  endDate: null,
  scholarshipAmount: null,
  scholarshipDeadline: null,
  showPartnerMsgOptIn: false,
  sidebar: null,
  signupArrowContent: null,
  tagline: 'Ready to start?',
};

export default LandingPage;
