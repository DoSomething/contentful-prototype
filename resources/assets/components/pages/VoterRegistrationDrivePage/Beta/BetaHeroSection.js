import React from 'react';
import PropTypes from 'prop-types';

import CoverImage from '../../../utilities/CoverImage/CoverImage';
import CampaignInfoBlock from '../../../blocks/CampaignInfoBlock/CampaignInfoBlock';

const BetaHeroSection = ({ user, campaignInfo, modalToggle }) => {
  const { firstName } = user;
  const {
    campaignId,
    coverImage,
    title,
    scholarshipAmount,
    scholarshipDeadline,
  } = campaignInfo;
  return (
    <div className="hero-landing-page">
      <CoverImage coverImage={coverImage} />
      <div className="clearfix bg-gray-100">
        <div className="base-12-grid bg-gray-100 cover-image py-3 md:py-6">
          <header role="banner" className="hero-banner">
            <h1 className="hero-banner__headline-title">{title}</h1>
            <h2 className="hero-banner__headline-subtitle">
              {firstName} has invited you to register to vote!
            </h2>
          </header>
          <div className="grid-wide-7/10 primary markdown">
            <blockquote>
              <p>
                Voting is important for young people because we can affect
                change on issues we care about most like climate change, living
                wages, and student loan reform.
              </p>
              <p>- {firstName}</p>
            </blockquote>
            <p>
              250,000+ young people have registered to vote via DoSomething (it
              takes less than 2 minutes!). After you register, share with your
              friends to enter to win a $1,500 scholarship!
            </p>
          </div>
          <div className="grid-wide-3/10 secondary">
            <CampaignInfoBlock
              scholarshipAmount={scholarshipAmount}
              scholarshipDeadline={scholarshipDeadline}
              showModal={modalToggle}
              campaignId={campaignId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaHeroSection;

BetaHeroSection.propTypes = {
  user: PropTypes.object.isRequired,
  campaignInfo: PropTypes.object.isRequired,
  modalToggle: PropTypes.func.isRequired,
};
