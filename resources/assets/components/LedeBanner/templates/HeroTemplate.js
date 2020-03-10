import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Modal from '../../utilities/Modal/Modal';
import ContentfulEntry from '../../ContentfulEntry';
import TextContent from '../../utilities/TextContent/TextContent';
import { SCHOLARSHIP_SIGNUP_BUTTON_TEXT } from '../../../constants';
import SignupButtonContainer from '../../SignupButton/SignupButtonContainer';
import CampaignInfoBlock from '../../blocks/CampaignInfoBlock/CampaignInfoBlock';
import AffiliatePromotion from '../../utilities/AffiliatePromotion/AffiliatePromotion';
import ScholarshipInfoBlock from '../../blocks/ScholarshipInfoBlock/ScholarshipInfoBlock';
import AffiliateOptInToggleContainer from '../../AffiliateOptInToggle/AffiliateOptInToggleContainer';
import {
  contentfulImageUrl,
  isScholarshipAffiliateReferral,
  getScholarshipAffiliateLabel,
} from '../../../helpers';

import './hero-lede-banner.scss';

const HeroTemplate = ({
  additionalContent,
  affiliateCreditText,
  affiliateSponsors,
  affiliateOptInContent,
  campaignId,
  content,
  coverImage,
  dashboard,
  displaySignupButton,
  isAffiliated,
  scholarshipAmount,
  scholarshipCallToAction,
  scholarshipDeadline,
  scholarshipDescription,
  numberOfScholarships,
  subtitle,
  title,
}) => {
  const scholarshipAffiliateLabel = getScholarshipAffiliateLabel();
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);
  const numCampaignId = Number(campaignId);

  useEffect(() => {
    if (scholarshipAffiliateLabel && scholarshipAmount && scholarshipDeadline) {
      setShowScholarshipModal(true);
    }
  }, []);

  // @TODO: If this experiment is successful we should turn generating the series urls for
  // the cover image photo at different sizes into a helper function!
  const coverImageUrls = {
    extraLarge: contentfulImageUrl(coverImage.url, '2232', '1000', 'fill'),
    large: contentfulImageUrl(coverImage.url, '1116', '500', 'fill'),
    medium: contentfulImageUrl(coverImage.url, '720', '350', 'fill'),
    small: contentfulImageUrl(coverImage.url, '360', '200', 'fill'),
  };
  return (
    <>
      {/*
        @TODO: hero-landing-page class was added to help differentiate styling from mosaic template.
        Should eventually be removed and use Tailwind. This will also help clean up the element hierarchy.
      */}
      <div className="hero-landing-page">
        <div className="base-12-grid bg-gray-100 cover-image">
          <img
            className="grid-wide"
            alt={coverImage.description || `cover photo for ${title}`}
            srcSet={`${coverImageUrls.small} 360w, ${coverImageUrls.medium} 720w, ${coverImageUrls.large} 1440w, ${coverImageUrls.extraLarge} 2880w`}
            src={coverImageUrls.small}
          />
        </div>

        <div className="clearfix bg-gray-100">
          <div className="base-12-grid">
            <header role="banner" className="hero-banner">
              <h1 className="hero-banner__headline-title">{title}</h1>
              <h2 className="hero-banner__headline-subtitle">{subtitle}</h2>
            </header>

            <div className="grid-wide-7/10 primary">
              <TextContent>{content}</TextContent>
              {affiliateSponsors.length ? (
                <AffiliatePromotion
                  className="mt-3"
                  imgUrl={
                    get(
                      additionalContent,
                      'campaignSponsorLogoAlternativeUrl',
                      null,
                    ) || affiliateSponsors[0].fields.logo.url
                  }
                  text={affiliateCreditText}
                  textClassName="text-gray-600"
                  title={affiliateSponsors[0].fields.logo.title}
                />
              ) : null}
            </div>

            <div className="grid-wide-3/10 secondary">
              {!isAffiliated && displaySignupButton ? (
                <div className="hero-signup-button">
                  <SignupButtonContainer
                    className="w-full"
                    text={
                      isScholarshipAffiliateReferral()
                        ? SCHOLARSHIP_SIGNUP_BUTTON_TEXT
                        : undefined
                    }
                    contextSource="campaign_landing_page"
                  />
                  {affiliateOptInContent ? (
                    <AffiliateOptInToggleContainer
                      affiliateOptInContent={affiliateOptInContent}
                    />
                  ) : null}
                </div>
              ) : null}

              <CampaignInfoBlock
                campaignId={numCampaignId}
                scholarshipAmount={scholarshipAmount}
                scholarshipDeadline={scholarshipDeadline}
              />
            </div>
          </div>
        </div>

        {showScholarshipModal && !isAffiliated ? (
          <Modal
            className="-inverted -scholarship__info"
            onClose={() => setShowScholarshipModal(false)}
            trackingId="SCHOLARSHIP_MODAL"
          >
            <ScholarshipInfoBlock
              affiliateSponsors={affiliateSponsors}
              campaignId={numCampaignId}
              scholarshipAmount={scholarshipAmount}
              scholarshipCallToAction={scholarshipCallToAction || undefined}
              scholarshipDeadline={scholarshipDeadline}
              scholarshipDescription={scholarshipDescription}
              numberOfScholarships={numberOfScholarships}
              utmLabel={scholarshipAffiliateLabel.toLowerCase()}
            >
              <div className="pt-6 w-2/3 sm:w-1/2">
                <SignupButtonContainer
                  className="w-full md:px-2"
                  text={SCHOLARSHIP_SIGNUP_BUTTON_TEXT}
                  contextSource="scholarship_modal"
                />
              </div>
            </ScholarshipInfoBlock>
          </Modal>
        ) : null}
      </div>

      {dashboard ? <ContentfulEntry json={dashboard} /> : null}
    </>
  );
};

HeroTemplate.propTypes = {
  additionalContent: PropTypes.object,
  affiliateCreditText: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliateOptInContent: PropTypes.object,
  numberOfScholarships: PropTypes.number,
  campaignId: PropTypes.string,
  content: PropTypes.string.isRequired,
  coverImage: PropTypes.object.isRequired,
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  displaySignupButton: PropTypes.bool,
  isAffiliated: PropTypes.bool,
  scholarshipAmount: PropTypes.number,
  scholarshipCallToAction: PropTypes.string,
  scholarshipDeadline: PropTypes.string,
  scholarshipDescription: PropTypes.object,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

HeroTemplate.defaultProps = {
  additionalContent: null,
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  affiliateOptInContent: null,
  numberOfScholarships: null,
  campaignId: null,
  dashboard: null,
  displaySignupButton: true,
  isAffiliated: false,
  scholarshipAmount: null,
  scholarshipCallToAction: null,
  scholarshipDeadline: null,
  scholarshipDescription: null,
};

export default HeroTemplate;
