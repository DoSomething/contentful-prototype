import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import Faq from './Faq';
import ErrorPage from '../../ErrorPage';
import { isDevEnvironment, query } from '../../../../helpers';
import NotFoundPage from '../../NotFoundPage';
import Placeholder from '../../../utilities/Placeholder';
import ButtonLink from '../../../utilities/ButtonLink/ButtonLink';
import CoverImage from '../../../utilities/CoverImage/CoverImage';
import SiteFooter from '../../../utilities/SiteFooter/SiteFooter';
import ContentBlock from '../../../blocks/ContentBlock/ContentBlock';
import CampaignInfoBlock from '../../../blocks/CampaignInfoBlock/CampaignInfoBlock';
import SiteNavigationContainer from '../../../SiteNavigation/SiteNavigationContainer';

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
      title
      coverImage {
        url
        description
      }
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
    return <NotFoundPage />;
  }

  const { firstName } = data.user;
  const { coverImage, title } = data.campaignWebsite;

  /**
   * TODO: Add campaignId, scholarshipAmount, and scholarshipDeadline as available properties
   * to our CampaignWebsite type in GraphQL to avoid hardcoding.
   *
   * For now, we're hiding the scholarship details.
   */
  const campaignInfoBlock = (
    <CampaignInfoBlock
      campaignId={isDevEnvironment ? 9035 : 9054}
      hideScholarshipDetails
      scholarshipAmount={1500}
      scholarshipDeadline="2020-04-30"
    />
  );

  return (
    <>
      <SiteNavigationContainer />
      <main>
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
                    change on issues we care about most like climate change,
                    living wages, and student loan reform.
                  </p>
                  <p>- {firstName}</p>
                </blockquote>
                <p>
                  250,000+ young people have registered to vote via DoSomething
                  (it takes less than 2 minutes!). After you register, share
                  with your friends to enter to win a $1,500 scholarship!
                </p>
              </div>
              <div className="grid-wide-3/10 secondary">
                {campaignInfoBlock}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="md:w-3/4 mx-auto py-6 px-3 pitch-landing-page">
            <ContentBlock
              superTitle="Step 1"
              title="Register To Vote"
              content="If you aren’t pre-registered or registered to vote, take 2 minutes to register at your current address. You’ll have the option to  register with an online form or directly with your state."
            />
            <div className="pb-6">
              {/* We will eventually want to add form fields for email and zip, and send as query parameters to Rock the Vote */}
              <ButtonLink
                link={`https://register.rockthevote.com/registrants/new?partner=37187&source=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`}
              >
                Register To Vote
              </ButtonLink>
            </div>
            <div className="pb-6">
              <Faq />
            </div>
            <ContentBlock
              superTitle="Step 2"
              title="Share With Your Friends"
              content="Every time you share your voter registration page before April 30, you'll be entered for a chance at winning a $1,500 scholarship."
            />
            <ButtonLink link="/us/campaigns/online-registration-drive">
              Get Started
            </ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default BetaVoterRegistrationDrivePage;
