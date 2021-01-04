import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useQuery } from 'react-apollo';

import ErrorPage from '../ErrorPage';
import { gqlVariables } from './config';
import NotFoundPage from '../NotFoundPage';
import { query } from '../../../helpers/url';
import Modal from '../../utilities/Modal/Modal';
import Placeholder from '../../utilities/Placeholder';
import { isDevEnvironment } from '../../../helpers/env';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import VoterRegistrationDrivePageBanner from './VoterRegistrationDrivePageBanner';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import ScholarshipInfoBlock from '../../blocks/ScholarshipInfoBlock/ScholarshipInfoBlock';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';
import StartVoterRegistrationForm from '../../utilities/StartVoterRegistrationForm/StartVoterRegistrationForm';

const VOTER_REGISTRATION_DRIVE_PAGE_QUERY = gql`
  query VoterRegistrationDrivePageQuery(
    $referrerUserId: String!
    $voterRegistrationDriveCampaignWebsiteId: String!
    $groupId: Int!
  ) {
    user(id: $referrerUserId) {
      id
      firstName
    }

    campaignWebsite(id: $voterRegistrationDriveCampaignWebsiteId) {
      additionalContent
      campaignId
      coverImage {
        description
        url
      }
      scholarshipAmount
      scholarshipDeadline
      title
      url
    }

    group(id: $groupId) {
      id
      goal
      name
      groupType {
        id
        name
      }
    }
  }
`;

const VoterRegistrationDrivePage = () => {
  const referrerUserId = query('referrer_user_id');
  const groupId = Number(query('group_id'));

  const config = isDevEnvironment()
    ? gqlVariables.development
    : gqlVariables.production;

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
    VOTER_REGISTRATION_DRIVE_PAGE_QUERY,
    {
      variables: {
        referrerUserId,
        voterRegistrationDriveCampaignWebsiteId,
        // This is a hack to avoid passing a null groupId, which is required for the query.
        groupId: groupId || 0,
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

  if (groupId && !data.group) {
    return <NotFoundPage id={query('group_id')} />;
  }

  const {
    additionalContent,
    campaignId,
    scholarshipAmount,
    scholarshipDeadline,
    url,
  } = data.campaignWebsite;

  return (
    <>
      <SiteNavigationContainer />
      <main data-test="voter-registration-drive-page">
        <VoterRegistrationDrivePageBanner
          campaignInfo={data.campaignWebsite}
          group={data.group}
          modalToggle={modalToggle}
          user={data.user}
        />
        <div className="py-6 base-12-grid bg-gray-100">
          <ContentfulEntryLoader
            id={config.startVoterRegistration.contentBlockId}
            className="grid-wide-7/10 clearfix wrapper"
            customProps={{ ContentBlock: { fullWidth: true } }}
          />
          <StartVoterRegistrationForm
            betaPage
            className="grid-wide-3/10"
            campaignId={campaignId}
            contextSource="beta-voter-registration-drive-page"
            groupId={groupId}
            referrerUserId={referrerUserId}
            sourceDetails="onlinedrivereferral"
          />
        </div>
        <div className="bg-white base-12-grid py-3 md:py-6">
          <div className="mx-auto py-6 grid-wide">
            <ContentfulEntryLoader
              id={config.faq.contentBlockId}
              className="grid-wide clearfix wrapper pb-3"
            />
            <ContentfulEntryLoader
              id={config.joinCampaign.contentBlockId}
              className="grid-wide clearfix wrapper pb-3"
            />
            <PrimaryButton
              attributes={{
                'data-test': 'visit-voter-registration-campaign-button',
              }}
              href={url}
              text="Get Started"
            />
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

export default VoterRegistrationDrivePage;
