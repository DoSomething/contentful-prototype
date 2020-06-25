import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';

import Modal from '../utilities/Modal/Modal';
import ContentfulEntry from '../ContentfulEntry';
import Spinner from '../artifacts/Spinner/Spinner';
import CampaignHeader from '../utilities/CampaignHeader';
import ErrorBlock from '../blocks/ErrorBlock/ErrorBlock';
import CoverImage from '../utilities/CoverImage/CoverImage';
import TextContent from '../utilities/TextContent/TextContent';
import { SCHOLARSHIP_SIGNUP_BUTTON_TEXT } from '../../constants';
import CampaignSignupFormContainer from '../CampaignSignupForm/CampaignSignupFormContainer';
import CampaignInfoBlock from '../blocks/CampaignInfoBlock/CampaignInfoBlock';
import AffiliatePromotion from '../utilities/AffiliatePromotion/AffiliatePromotion';
import ScholarshipInfoBlock from '../blocks/ScholarshipInfoBlock/ScholarshipInfoBlock';
import AffiliateOptInToggleContainer from '../AffiliateOptInToggle/AffiliateOptInToggleContainer';
import {
  isScholarshipAffiliateReferral,
  getScholarshipAffiliateLabel,
  tailwind,
} from '../../helpers';

const CAMPAIGN_BANNER_QUERY = gql`
  query CampaignBannerQuery($id: Int!) {
    campaign(id: $id) {
      id
      groupTypeId
    }
  }
`;

const CampaignBanner = ({
  actionIdToDisplay,
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

  const { loading, error, data } = useQuery(CAMPAIGN_BANNER_QUERY, {
    variables: { id: numCampaignId },
  });

  if (error) {
    return <ErrorBlock error={error} />;
  }

  const campaignGroupTypeId = get(data, 'campaign.groupTypeId', null);

  return (
    <>
      <CoverImage coverImage={coverImage} />

      <div className="clearfix bg-gray-100">
        <div className="base-12-grid py-3 md:py-6">
          <CampaignHeader title={title} subtitle={subtitle} />

          <div
            data-testid="campaign-banner-primary-content"
            className="grid-wide-7/10 mb-6"
          >
            <TextContent>{content}</TextContent>

            {affiliateSponsors.length ? (
              <AffiliatePromotion
                className="mt-3"
                imgUrl={affiliateSponsors[0].fields.logo.url}
                text={affiliateCreditText}
                textClassName="text-gray-600"
                title={affiliateSponsors[0].fields.logo.title}
              />
            ) : null}
          </div>

          <div
            data-testid="campaign-banner-secondary-content"
            className="grid-wide-3/10 mb-6 xxl:row-start-1 xxl:row-span-3"
          >
            {!isAffiliated ? (
              <div
                data-testid="campaign-banner-signup-button"
                className="bg-white bottom-0 md:bottom-auto left-0 md:left-auto p-3 md:p-0 fixed md:static w-full md:w-auto z-10 md:z-auto"
                css={css`
                  border-top: 1px solid tailwind('colors.gray.200');

                  @media (min-width: ${tailwind('screens.medium')}) {
                    background-color: none;
                  }
                `}
              >
                {!loading ? (
                  <CampaignSignupFormContainer
                    campaignGroupTypeId={campaignGroupTypeId}
                    className="block md:mb-3 p-6 text-lg w-full"
                    text={
                      isScholarshipAffiliateReferral()
                        ? SCHOLARSHIP_SIGNUP_BUTTON_TEXT
                        : undefined
                    }
                    contextSource="campaign_landing_page"
                  />
                ) : (
                  <Spinner className="flex justify-center p-6 mb-3" />
                )}

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
              'data-testid': 'campaign-info-block-scholarship-details',
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
              <div
                className={`pt-6 ${
                  !campaignGroupTypeId ? 'w-2/3 sm:w-1/2' : null
                }`}
              >
                {!loading ? (
                  <CampaignSignupFormContainer
                    campaignGroupTypeId={campaignGroupTypeId}
                    className="w-full md:px-2"
                    text={SCHOLARSHIP_SIGNUP_BUTTON_TEXT}
                    contextSource="scholarship_modal"
                  />
                ) : (
                  <Spinner className="flex justify-center p-6" />
                )}
              </div>
            ) : null}
          </ScholarshipInfoBlock>
        </Modal>
      ) : null}

      {dashboard ? <ContentfulEntry json={dashboard} /> : null}
    </>
  );
};

CampaignBanner.propTypes = {
  actionIdToDisplay: PropTypes.number,
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

CampaignBanner.defaultProps = {
  actionIdToDisplay: null,
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

export default CampaignBanner;
