/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import Card from '../../utilities/Card/Card';
import { getScholarshipAffiliateLabel } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CallToActionContainer from '../../CallToAction/CallToActionContainer';
import CampaignInfoBarContainer from '../../CampaignInfoBar/CampaignInfoBarContainer';
import AffiliateScholarshipBlockQuery from '../../blocks/AffiliateScholarshipBlock/AffiliateScholarshipBlockQuery';

const LandingPage = props => {
  const {
    campaignId,
    content,
    isCampaignClosed,
    featureFlagUseLegacyTemplate,
    scholarshipAmount,
    scholarshipDeadline,
    sidebarCTA,
    signupArrowContent,
    tagline,
  } = props;
  const scholarshipAffiliateLabel = getScholarshipAffiliateLabel();
  const displayAffiliateScholarshipBlock =
    scholarshipAffiliateLabel && scholarshipAmount && scholarshipDeadline;

  return (
    <React.Fragment>
      <LedeBannerContainer
        isClosed={isCampaignClosed}
        signupArrowContent={signupArrowContent}
      />
      {featureFlagUseLegacyTemplate ? (
        <>
          <div className="bg-white">
            <Enclosure className="md:w-3/4 mx-auto py-6 px-3 pitch-landing-page">
              <div className="campaign-page clearfix">
                <div className="primary">
                  {displayAffiliateScholarshipBlock ? (
                    <AffiliateScholarshipBlockQuery
                      campaignId={Number(campaignId)}
                      utmLabel={scholarshipAffiliateLabel.toLowerCase()}
                      scholarshipAmount={scholarshipAmount}
                      scholarshipDeadline={scholarshipDeadline}
                      className="mb-6"
                    />
                  ) : null}

                  <TextContent>{content}</TextContent>
                </div>
                <div className="secondary">
                  <Card title={sidebarCTA.title} className="rounded bordered">
                    <TextContent className="p-3">
                      {sidebarCTA.content}
                    </TextContent>
                  </Card>
                </div>
              </div>
            </Enclosure>
          </div>

          <CallToActionContainer
            className="bg-gray-100-important border-t border-solid border-gray-300 font-bold px-3 md:px-6 py-6 text-base md:text-lg"
            content={tagline}
          />

          <CampaignInfoBarContainer />

          <div className="info-bar bg-gray-700">
            <div className="wrapper">
              A DoSomething.org campaign. Join millions of young people
              transforming their communities. Let&#39;s Do This!
            </div>
          </div>
        </>
      ) : null}
    </React.Fragment>
  );
};

LandingPage.propTypes = {
  campaignId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  featureFlagUseLegacyTemplate: PropTypes.bool,
  isCampaignClosed: PropTypes.bool,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  sidebarCTA: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  signupArrowContent: PropTypes.string,
  tagline: PropTypes.string,
};

LandingPage.defaultProps = {
  featureFlagUseLegacyTemplate: false,
  isCampaignClosed: false,
  scholarshipAmount: null,
  scholarshipDeadline: null,
  sidebarCTA: {
    title: 'what you get',
    content: '*You could win a $5,000 dollar scholarship!*',
  },
  signupArrowContent: null,
  tagline: 'Ready to start?',
};

export default LandingPage;
