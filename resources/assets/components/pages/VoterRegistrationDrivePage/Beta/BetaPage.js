import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import {
  faq,
  registerToVote,
  voterRegistrationDriveCampaignLink,
} from './config';
import ErrorPage from '../../ErrorPage';
import HeroSection from './HeroSection';
import { query } from '../../../../helpers';
import NotFoundPage from '../../NotFoundPage';
import Modal from '../../../utilities/Modal/Modal';
import Placeholder from '../../../utilities/Placeholder';
import ButtonLink from '../../../utilities/ButtonLink/ButtonLink';
import SiteFooter from '../../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../../SiteNavigation/SiteNavigationContainer';
import ScholarshipInfoBlock from '../../../blocks/ScholarshipInfoBlock/ScholarshipInfoBlock';
import ContentfulEntryLoader from '../../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const BETA_VOTER_REGISTRATION_DRIVE_PAGE_QUERY = gql`
  query BetaVoterRegistrationDrivePageQuery(
    $referrerUserId: String!
    $voterRegistrationDriveCampaignWebsiteId: String!
  ) {
    user(id: $referrerUserId) {
      id
      firstName
    }

    campaignWebsite(id: $voterRegistrationDriveCampaignWebsiteId) {
      campaignId
      title
      coverImage {
        url
        description
      }
      scholarshipAmount
      scholarshipDeadline
      additionalContent
    }
  }
`;

const BetaVoterRegistrationDrivePage = () => {
  const referrerUserId = query('referrer_user_id');
  /**
   * The CampaignWebsite ID is the same across all Contentful environments for OVRD.
   * @see /docs/development/features/voter-registration
   */
  const voterRegistrationDriveCampaignWebsiteId = '3pwxnRZxociqMaQCMcGOyc';
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);

  const modalToggle = () => setShowScholarshipModal(true);

  if (!referrerUserId) {
    return <NotFoundPage />;
  }

  const { loading, error, data } = useQuery(
    BETA_VOTER_REGISTRATION_DRIVE_PAGE_QUERY,
    {
      variables: {
        referrerUserId,
        voterRegistrationDriveCampaignWebsiteId,
      },
    },
  );

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!data.user) {
    return <NotFoundPage id={referrerUserId} />;
  }

  const {
    additionalContent,
    campaignId,
    scholarshipAmount,
    scholarshipDeadline,
  } = data.campaignWebsite;

  return (
    <>
      <SiteNavigationContainer />
      <main>
        <HeroSection
          user={data.user}
          campaignInfo={data.campaignWebsite}
          modalToggle={modalToggle}
        />
        <div className="bg-white">
          <div className="md:w-3/4 mx-auto py-6 px-3 pitch-landing-page">
            <ContentfulEntryLoader
              id={registerToVote.contentBlockId}
              className="grid-wide clearfix wrapper pb-3"
            />
            <div className="pb-6">
              {/* We will eventually want to add form fields for email and zip, and send as query parameters to Rock the Vote */}
              <ButtonLink
                link={`https://register.rockthevote.com/registrants/new?partner=37187&source=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`}
              >
                Register To Vote
              </ButtonLink>
            </div>
            <ContentfulEntryLoader
              id={faq.contentBlockId}
              className="grid-wide clearfix wrapper pb-3"
            />
            <ContentfulEntryLoader
              id={voterRegistrationDriveCampaignLink.contentBlockId}
              className="grid-wide clearfix wrapper pb-3"
            />
            <ButtonLink link="/us/campaigns/online-registration-drive">
              Get Started
            </ButtonLink>
          </div>
        </div>
        {showScholarshipModal ? (
          <Modal
            className="-inverted -scholarship__info"
            onClose={() => {
              setShowScholarshipModal(false);
            }}
            trackingId="SCHOLARSHIP_MODAL_BETA_VOTER_REGISTRATION"
          >
            <ScholarshipInfoBlock
              campaignId={campaignId}
              scholarshipAmount={scholarshipAmount}
              scholarshipDeadline={scholarshipDeadline}
              numberOfScholarships={additionalContent.numberOfScholarships || 1}
            />
          </Modal>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
};

export default BetaVoterRegistrationDrivePage;
