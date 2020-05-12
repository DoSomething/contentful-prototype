import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Modal from '../../utilities/Modal/Modal';
import ContentfulEntry from '../../ContentfulEntry';
import CoverImage from '../../utilities/CoverImage/CoverImage';
import TextContent from '../../utilities/TextContent/TextContent';
import { SCHOLARSHIP_SIGNUP_BUTTON_TEXT } from '../../../constants';
import SignupButtonContainer from '../../SignupButton/SignupButtonContainer';
import CampaignInfoBlock from '../../blocks/CampaignInfoBlock/CampaignInfoBlock';
import AffiliatePromotion from '../../utilities/AffiliatePromotion/AffiliatePromotion';
import ScholarshipInfoBlock from '../../blocks/ScholarshipInfoBlock/ScholarshipInfoBlock';
import AffiliateOptInToggleContainer from '../../AffiliateOptInToggle/AffiliateOptInToggleContainer';
import {
  isScholarshipAffiliateReferral,
  getScholarshipAffiliateLabel,
} from '../../../helpers';

import './hero-lede-banner.scss';

const HeroTemplate = ({
  actionIdToDisplay,
  additionalContent,
  affiliateCreditText,
  affiliateSponsors,
  affiliateOptInContent,
  campaignId,
  content,
  coverImage,
  dashboard,
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
  const [
    showReferralScholarshipModal,
    setShowReferralScholarshipModal,
  ] = useState(false);
  const numCampaignId = Number(campaignId);

  useEffect(() => {
    if (scholarshipAffiliateLabel && scholarshipAmount && scholarshipDeadline) {
      setShowReferralScholarshipModal(true);
    }
  }, []);

  return (
    <>
      {/*
        @TODO: hero-landing-page class was added to help differentiate styling from mosaic template.
        Should eventually be removed and use Tailwind. This will also help clean up the element hierarchy.
      */}
      <div className="hero-landing-page">
        <CoverImage coverImage={coverImage} />
        <div className="clearfix bg-gray-100">
          <div className="base-12-grid py-3 md:py-6">
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
              {!isAffiliated ? (
                <div className="hero-signup-button">
                  <SignupButtonContainer
                    className="block md:mb-3 p-6 text-lg w-full"
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
                showModal={() => setShowScholarshipModal(true)}
                actionIdToDisplay={actionIdToDisplay}
              />
            </div>
          </div>
        </div>

        {(showReferralScholarshipModal && !isAffiliated) ||
        showScholarshipModal ? (
          <Modal
            className="-inverted -scholarship__info"
            onClose={() => {
              setShowScholarshipModal(false);
              setShowReferralScholarshipModal(false);
            }}
            trackingId="SCHOLARSHIP_MODAL"
          >
            <ScholarshipInfoBlock
              actionIdToDisplay={actionIdToDisplay}
              affiliateSponsors={affiliateSponsors}
              attributes={{
                'data-test': 'campaign-info-block-scholarship-details',
              }}
              campaignId={numCampaignId}
              scholarshipAmount={scholarshipAmount}
              scholarshipCallToAction={scholarshipCallToAction || undefined}
              scholarshipDeadline={scholarshipDeadline}
              scholarshipDescription={scholarshipDescription}
              numberOfScholarships={numberOfScholarships}
              utmLabel={
                scholarshipAffiliateLabel
                  ? scholarshipAffiliateLabel.toLowerCase()
                  : null
              }
            >
              {!isAffiliated ? (
                <div className="pt-6 w-2/3 sm:w-1/2">
                  <SignupButtonContainer
                    className="w-full md:px-2"
                    text={SCHOLARSHIP_SIGNUP_BUTTON_TEXT}
                    contextSource="scholarship_modal"
                  />
                </div>
              ) : null}
            </ScholarshipInfoBlock>
          </Modal>
        ) : null}
      </div>

      {dashboard ? <ContentfulEntry json={dashboard} /> : null}
    </>
  );
};

HeroTemplate.propTypes = {
  actionIdToDisplay: PropTypes.number,
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
  isAffiliated: PropTypes.bool,
  scholarshipAmount: PropTypes.number,
  scholarshipCallToAction: PropTypes.string,
  scholarshipDeadline: PropTypes.string,
  scholarshipDescription: PropTypes.object,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

HeroTemplate.defaultProps = {
  actionIdToDisplay: null,
  additionalContent: null,
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  affiliateOptInContent: null,
  numberOfScholarships: 1,
  campaignId: null,
  dashboard: null,
  isAffiliated: false,
  scholarshipAmount: null,
  scholarshipCallToAction: null,
  scholarshipDeadline: null,
  scholarshipDescription: null,
};

export default HeroTemplate;
