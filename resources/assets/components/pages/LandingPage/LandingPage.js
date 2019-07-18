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
    affiliateCreditText,
    affiliatePartners,
    affiliateSponsors,
    campaignId,
    campaignLead,
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
          additionalContent={additionalContent}
          affiliateSponsors={affiliateSponsors}
          content={content}
          coverImage={coverImage}
          endDate={endDate}
          scholarshipAmount={scholarshipAmount}
          subtitle={subtitle}
          title={title}
        />
      ) : (
        <PitchTemplate
          additionalContent={additionalContent}
          affiliateCreditText={affiliateCreditText}
          affiliatePartners={affiliatePartners}
          affiliateSponsors={affiliateSponsors}
          campaignId={campaignId}
          campaignLead={campaignLead}
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
  affiliateCreditText: PropTypes.string,
  affiliatePartners: PropTypes.arrayOf(PropTypes.object),
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  campaignId: PropTypes.string.isRequired,
  campaignLead: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
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
};

LandingPage.defaultProps = {
  additionalContent: null,
  affiliateCreditText: undefined,
  affiliatePartners: [],
  affiliateSponsors: [],
  campaignLead: {},
  endDate: null,
  scholarshipAmount: null,
  scholarshipDeadline: null,
  showPartnerMsgOptIn: false,
  sidebar: null,
  signupArrowContent: null,
  tagline: 'Ready to start?',
};

export default LandingPage;
