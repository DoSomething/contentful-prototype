import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';

import {
  isScholarshipAffiliateReferral,
  getScholarshipAffiliateLabel,
  isCurrentPathInPaths,
  siteConfig,
} from '../../helpers';
import { UNGATED_SESSION_KEY } from '../Campaign/CampaignRoute/CampaignRoute';
import Modal from '../utilities/Modal/Modal';
import ContentfulEntry from '../ContentfulEntry';
import partnerScholarshipQuizPaths from './config';
import Spinner from '../artifacts/Spinner/Spinner';
import CampaignHeader from '../utilities/CampaignHeader';
import ErrorBlock from '../blocks/ErrorBlock/ErrorBlock';
import CoverImage from '../utilities/CoverImage/CoverImage';
import { getGoalInfo } from '../../helpers/voter-registration';
import ProgressBar from '../utilities/ProgressBar/ProgressBar';
import TextContent from '../utilities/TextContent/TextContent';
import { SCHOLARSHIP_SIGNUP_BUTTON_TEXT } from '../../constants';
import CampaignInfoBlock from '../blocks/CampaignInfoBlock/CampaignInfoBlock';
import SixpackExperiment from '../utilities/SixpackExperiment/SixpackExperiment';
import AffiliatePromotion from '../utilities/AffiliatePromotion/AffiliatePromotion';
import ScholarshipInfoBlock from '../blocks/ScholarshipInfoBlock/ScholarshipInfoBlock';
import CampaignSignupFormContainer from '../CampaignSignupForm/CampaignSignupFormContainer';
import AffiliateOptInToggleContainer from '../AffiliateOptInToggle/AffiliateOptInToggleContainer';
import ScholarshipReferralVoterRegistrationBlock from '../blocks/ScholarshipReferralVoterRegistrationBlock/ScholarshipReferralVoterRegistrationBlock';

const CAMPAIGN_BANNER_QUERY = gql`
  query CampaignBannerQuery($id: Int!) {
    campaign(id: $id) {
      id
      groupTypeId
      groupType {
        id
        filterByLocation
      }
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
  const showVoterRegistrationModal =
    isCurrentPathInPaths(partnerScholarshipQuizPaths) && !showScholarshipModal;

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

  const groupType = get(data, 'campaign.groupType', null);
  const impactGoal = Number(siteConfig('go_greener_campaign_goal', null));
  const currentImpactTotal = Number(
    siteConfig('go_greener_campaign_quantity', 0),
  );

  const { goal, percentage } = getGoalInfo(impactGoal, currentImpactTotal);

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
            {numCampaignId === 9109 || numCampaignId === 9001 ? (
              <SixpackExperiment
                internalTitle="Campaign Progress Bar Experiment"
                convertableActions={['signup']}
                alternatives={[
                  <div className="mb-6" testName="Progress Bar Visible">
                    <ProgressBar percentage={percentage} />
                    <p className="text-lg">
                      <span className="font-bold">
                        {`${currentImpactTotal.toLocaleString()}`} lbs of CO2
                        saved so far.
                      </span>
                      {` `}Help us get to {`${goal.toLocaleString()}`}!
                    </p>
                  </div>,
                ]}
              />
            ) : null}
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
            {!isAffiliated &&
            !window.sessionStorage.getItem(UNGATED_SESSION_KEY) ? (
              <div
                data-testid="campaign-banner-signup-button"
                className={classnames(
                  'bg-white bottom-0 md:bottom-auto left-0 md:left-auto p-3 md:static md:p-0 w-full md:w-auto z-10 md:z-auto',
                  { fixed: !groupType },
                )}
              >
                {!loading ? (
                  <CampaignSignupFormContainer
                    className="block md:mb-3 p-6 text-lg w-full"
                    groupType={groupType}
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

                {/* TODO: Move this into the CampaignSignupForm */}
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
          trackingId={
            showVoterRegistrationModal
              ? 'SCHOLARSHIP_MODAL_VOTER_REGISTRATION'
              : 'SCHOLARSHIP_MODAL'
          }
        >
          {showVoterRegistrationModal ? (
            <ScholarshipReferralVoterRegistrationBlock
              affiliateSponsors={affiliateSponsors}
              attributes={{
                'data-testid': 'voter-registration-quiz-start-registration',
              }}
              campaignId={numCampaignId}
              utmLabel={
                scholarshipAffiliateLabel
                  ? scholarshipAffiliateLabel.toLowerCase()
                  : null
              }
            />
          ) : (
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
              {!isAffiliated &&
              !window.sessionStorage.getItem(UNGATED_SESSION_KEY) ? (
                <div
                  data-testid="scholarship-modal-signup-button"
                  className={`pt-6 ${!groupType ? 'w-2/3 sm:w-1/2' : null}`}
                >
                  {!loading ? (
                    <CampaignSignupFormContainer
                      className="w-full md:px-2"
                      groupType={groupType}
                      text={SCHOLARSHIP_SIGNUP_BUTTON_TEXT}
                      contextSource="scholarship_modal"
                    />
                  ) : (
                    <Spinner className="flex justify-center p-6" />
                  )}
                </div>
              ) : null}
            </ScholarshipInfoBlock>
          )}
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
