import React from 'react';
import tw from 'twin.macro';

import { featureFlag } from '../../../../helpers';
import SignupReferralsGallery from './SignupReferralsGallery';
import { getReferFriendsLink } from '../../../../helpers/refer-friends';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const Details = tw.details`pb-4`;
const Summary = tw.summary`font-bold text-base cursor-pointer`;
const DetailsParagraph = tw.p`pt-2`;

const ReferFriendsTab = () => {
  const referralIncentive = featureFlag('refer_friends_incentive');

  return (
    <>
      <div className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-7 xxl:col-start-2 xxl:col-span-6">
        <SectionHeader underlined title="Get Your Friends Involved" />

        <SocialDriveActionContainer
          shareCardTitle="Refer a friend!"
          shareCardDescription={
            referralIncentive
              ? 'When your friend signs up for their first DoSomething campaign, you’ll both enter for a chance to win a $10 gift card! Every 2 weeks, we’ll randomly select 25 winners. The more friends you refer, the more chances you have to win. (P.S. There’s no limit on how many friends you can refer!)'
              : 'Share the link below with a friend and invite them to sign up for their first DoSomething campaign! As soon as your friend signs up, you’ll see their name in the Your Referrals section below. Let’s Do This.'
          }
          link={getReferFriendsLink()}
          fullWidth
        />
      </div>

      <div className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-11 xxl:col-start-2 xxl:col-span-10 pt-4">
        <SignupReferralsGallery />
      </div>

      <div className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-7 xxl:col-start-2 xxl:col-span-6 pt-10">
        <SectionHeader underlined title="faq" />

        <Details>
          <Summary>Why should I refer a friend?</Summary>

          <DetailsParagraph>
            {referralIncentive
              ? 'To earn the chance to win a $10 gift card, you need to refer NEW members to DoSomething! Referring someone who already has a DoSomething account is an awesome way to build our movement, but unfortunately, referring them won’t enter you for a chance at the gift card.'
              : 'You’ll help your friend join our youth-led movement for good, make an impact on the causes they care about, and have the chance to earn scholarships for volunteering.'}
          </DetailsParagraph>
        </Details>

        <Details>
          <Summary>How do I know that I’ve referred a friend?</Summary>

          <DetailsParagraph>
            Share the link above with your friend, either via text, email, or
            social media. Using that link, your friend will create a DoSomething
            account and then sign up for a campaign. When they sign up, you’ll
            see their name in the “Your Referrals” section. Yep, that easy.
          </DetailsParagraph>
        </Details>

        {referralIncentive ? (
          <Details>
            <Summary>How will I receive my gift card if I win?</Summary>

            <DetailsParagraph>
              We’ll email it to you using the same email address used to create
              your DoSomething account.
            </DetailsParagraph>
          </Details>
        ) : null}

        <Details>
          <Summary>Where can I find the full rules?</Summary>

          <DetailsParagraph>
            This offer is for a limited time only. See the{' '}
            <a href="/us/refer-a-friend-official-rules">
              Refer A Friend Official Rules.
            </a>
          </DetailsParagraph>
        </Details>
      </div>
    </>
  );
};

export default ReferFriendsTab;
