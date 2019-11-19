/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

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
    subtitle,
    title,
  } = props;

  return (
    <React.Fragment>
      <MarqueeTemplate
        additionalContent={additionalContent}
        affiliateCreditText={affiliateCreditText}
        affiliateSponsors={affiliateSponsors}
        affiliateOptInContent={affiliateOptInContent}
        campaignId={campaignId}
        content={content}
        coverImage={coverImage}
        endDate={endDate}
        scholarshipAmount={scholarshipAmount}
        scholarshipDeadline={scholarshipDeadline}
        subtitle={subtitle}
        testName="Marquee Template"
        title={title}
      />
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
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

LandingPage.defaultProps = {
  additionalContent: null,
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  affiliateOptInContent: null,
  endDate: null,
  scholarshipAmount: null,
  scholarshipDeadline: null,
};

export default LandingPage;
