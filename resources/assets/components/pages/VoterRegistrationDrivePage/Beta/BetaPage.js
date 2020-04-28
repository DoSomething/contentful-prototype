import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import Faq from './Faq';
import ErrorPage from '../../ErrorPage';
import { query } from '../../../../helpers';
import NotFoundPage from '../../NotFoundPage';
import Placeholder from '../../../utilities/Placeholder';
import ButtonLink from '../../../utilities/ButtonLink/ButtonLink';
import CoverImage from '../../../utilities/CoverImage/CoverImage';
import SiteFooter from '../../../utilities/SiteFooter/SiteFooter';
import ContentBlock from '../../../blocks/ContentBlock/ContentBlock';
import CampaignInfoBlock from '../../../blocks/CampaignInfoBlock/CampaignInfoBlock';
import SiteNavigationContainer from '../../../SiteNavigation/SiteNavigationContainer';

const VOTER_REGISTRATION_DRIVE_PAGE_REFERRER_USER_QUERY = gql`
  query VoterRegistrationDrivePageReffererUserQuery($referrerUserId: String!) {
    user(id: $referrerUserId) {
      id
      firstName
    }
  }
`;

const ALPHA_CAMPAIGN_INFO_QUERY = gql`
  query AlphaCampaignInfoQuery($campaignId: Int!) {
    campaign(id: $campaignId) {
      id
      campaignWebsite {
        title
        coverImage {
          url
          description
        }
      }
    }
  }
`;

const VoterRegistrationDrivePage = () => {
  const referrerUserId = query('referrer_user_id');
  const rogueCampaignId = process.env.NODE_ENV === 'production' ? 9054 : 9006;

  if (!referrerUserId) {
    return <NotFoundPage />;
  }

  const { loading, error, data } = useQuery(
    VOTER_REGISTRATION_DRIVE_PAGE_REFERRER_USER_QUERY,
    {
      variables: { referrerUserId },
    },
  );

  const {
    loading: alphaLoading,
    error: alphaError,
    data: alphaData,
  } = useQuery(ALPHA_CAMPAIGN_INFO_QUERY, {
    variables: {
      campaignId: rogueCampaignId,
    },
  });

  if (loading || alphaLoading) {
    return <Placeholder />;
  }

  if (error || alphaError) {
    console.error(`[ErrorBlock] ${error}`);
    return <ErrorPage />;
  }

  if (!data.user) {
    return <NotFoundPage />;
  }

  const { firstName } = data.user;
  const { coverImage, title } = alphaData.campaign.campaignWebsite;
  /**
   * Because this component isn't associated with a campaign Contentful entry, we don't have a
   * scholarship amount or deadline to pull from. We may need to hardcode a Contentful ID, or keep
   * this hardcoded -- but we will eventually need to figure out how to display the modal to show
   * additional scholarship information.
   *
   * 04/28/20 - keeping the scholarship info hard coded for v1 and hiding details link
   */
  const campaignInfoBlock = (
    <CampaignInfoBlock
      campaignId={rogueCampaignId}
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
          <CoverImage coverImage={coverImage} title={title} />
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

export default VoterRegistrationDrivePage;
