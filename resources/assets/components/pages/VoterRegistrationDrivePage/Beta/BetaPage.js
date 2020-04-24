import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import ErrorPage from '../../ErrorPage';
import { query } from '../../../../helpers';
import NotFoundPage from '../../NotFoundPage';
import Placeholder from '../../../utilities/Placeholder';
import Faq from './Faq';
import ButtonLink from '../../../utilities/ButtonLink/ButtonLink';
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

// Because we don't have a link to contentful, this image url will need to get updated if we want a new coverImage

const coverImageUrl =
  'https://images.ctfassets.net/81iqaqpfd8fy/3uyVbvfCxFTp4zWYQCXJSG/eb10583a58a040dc374ad9b5447b65d3/vote.dosomething.2020__1_.jpg?h=250';

const VoterRegistrationDrivePage = () => {
  const referrerUserId = query('referrer_user_id');

  if (!referrerUserId) {
    return <NotFoundPage />;
  }

  const { loading, error, data } = useQuery(
    VOTER_REGISTRATION_DRIVE_PAGE_REFERRER_USER_QUERY,
    {
      variables: { referrerUserId },
    },
  );

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!data.user) {
    return <NotFoundPage />;
  }

  const { firstName } = data.user;
  /**
   * Because this component isn't associated with a campaign Contentful entry, we don't have a
   * scholarship amount or deadline to pull from. We may need to hardcode a Contentful ID, or keep
   * this hardcoded -- but we will eventually need to figure out how to display the modal to show
   * additional scholarship information.
   */
  const campaignInfoBlock = (
    <CampaignInfoBlock
      campaignId={process.env.NODE_ENV === 'production' ? 9008 : 9035}
      scholarshipAmount={1500}
      scholarshipDeadline="2020-04-30"
    />
  );

  const srcset = contentfulImageSrcset(coverImageUrl, [
    { height: 360, width: 640 },
    { height: 576, width: 1024 },
    { height: 810, width: 1440 },
    { height: 1620, width: 2880 },
  ]);

  return (
    <>
      <SiteNavigationContainer />
      <main>
        <div className="hero-landing-page">
          <div className="base-12-grid bg-gray-100 cover-image py-3 md:py-6">
            <img
              className="grid-wide"
              alt={
                'Collage of eight smiling young people with "I Voted" stickers'
              }
              srcSet={srcset}
              src={contentfulImageUrl(coverImageUrl, '1440', '810', 'fill')}
            />
          </div>
          <div className="clearfix bg-gray-100">
            <div className="base-12-grid bg-gray-100 cover-image py-3 md:py-6">
              <header role="banner" className="hero-banner">
                <h1 className="hero-banner__headline-title">
                  Ready, Set, Vote!
                </h1>
                <h2 className="hero-banner__headline-subtitle">
                  {firstName} has invited you to register to vote!
                </h2>
              </header>
              <div className="grid-wide-7/10 primary">
                <p>
                  Voting is important for young people because we can affect
                  change on issues we care about most like climate change,
                  living wages, and student loan reform.
                </p>
                <p>- {firstName}</p>
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
