import React from 'react';
import PropTypes from 'prop-types';

import { votingReasons } from './config';
import { query } from '../../../../helpers';
import CoverImage from '../../../utilities/CoverImage/CoverImage';
import CampaignInfoBlock from '../../../blocks/CampaignInfoBlock/CampaignInfoBlock';

const HeroSection = ({ user, campaignInfo, modalToggle }) => {
  const { firstName } = user;
  const {
    campaignId,
    coverImage,
    scholarshipAmount,
    scholarshipDeadline,
    title,
  } = campaignInfo;

  /**
   * Query url for voting-reasons param.
   *
   * @return {String}
   */

  const formatQuote = () => {
    const votingReasonsQuery = query('voting-reasons');

    if (!votingReasonsQuery) {
      return null;
    }

    const votingReasonsValues = votingReasonsQuery.split(',');

    if (votingReasonsValues.length === 1) {
      return ` like ${votingReasons[votingReasonsValues[0]]}`;
    }

    if (votingReasonsValues.length > 1) {
      let result = '';

      votingReasonsValues.forEach((value, index) => {
        if (index === votingReasonsValues.length - 1) {
          result = `${result} and ${votingReasons[value]}`;
        } else {
          result = `${result}, ${votingReasons[value]}`;
        }
      });

      return ` like ${result}`;
    }

    return ' ';
  };

  return (
    <div className="hero-landing-page">
      <CoverImage
        attributes={{
          'data-test': 'beta-voter-registration-drive-page-cover-image',
        }}
        coverImage={coverImage}
      />
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
              <p data-test="beta-voter-registration-drive-page-quote-text">
                Voting is important for young people because we can effect
                change on issues we care about most
                {formatQuote()}.
              </p>
              <p data-test="beta-voter-registration-drive-page-quote-byline">
                - {firstName}
              </p>
            </blockquote>
            <p data-test="beta-voter-registration-drive-page-blurb">
              250,000+ young people have registered to vote via DoSomething (it
              takes less than 2 minutes!). After you register, share with your
              friends to enter to win a $
              {`${scholarshipAmount.toLocaleString()}`} scholarship!
            </p>
          </div>
          <div
            data-test="beta-voter-registration-drive-page-campaign-info-block"
            className="grid-wide-3/10 secondary"
          >
            <CampaignInfoBlock
              campaignId={campaignId}
              scholarshipAmount={scholarshipAmount}
              scholarshipDeadline={scholarshipDeadline}
              showModal={modalToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

HeroSection.propTypes = {
  user: PropTypes.object.isRequired,
  campaignInfo: PropTypes.object.isRequired,
  modalToggle: PropTypes.func.isRequired,
};
