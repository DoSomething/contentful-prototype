import React from 'react';
import tw from 'twin.macro';

import SignupReferralsGallery from './SignupReferralsGallery';
import { getReferFriendsLink } from '../../../../helpers/refer-friends';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const Details = tw.details`pb-4`;
const Summary = tw.summary`font-bold text-base cursor-pointer`;
const DetailsParagraph = tw.p`pt-2`;

const ReferFriendsTab = () => (
  <>
    <div className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-7 xxl:col-start-2 xxl:col-span-6">
      <SectionHeader underlined title="Get Your Friends Involved" />

      <SocialDriveActionContainer
        shareCardTitle="Refer a friend!"
        shareCardDescription="Share the link below with a friend and invite them to sign up for their first DoSomething campaign! As soon as your friend signs up, you’ll see their name in the Your Referrals section below. Let’s Do This."
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
          You’ll help your friend join our youth-led movement for good, make an
          impact on the causes they care about, and have the chance to earn
          scholarships for volunteering.
        </DetailsParagraph>
      </Details>

      <Details>
        <Summary>How do I know that I’ve referred a friend?</Summary>

        <DetailsParagraph>
          Share the link above with your friend, either via text, email, or
          social media. Using that link, your friend will create a DoSomething
          account and then sign up for a campaign. When they sign up, you’ll see
          their name in the “Your Referrals” section. Yep, that easy.
        </DetailsParagraph>
      </Details>

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

export default ReferFriendsTab;
