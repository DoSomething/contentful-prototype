import React from 'react';

import { featureFlag } from '../../../../helpers';
import Details from '../../../utilities/FaqElements/Details';
import Summary from '../../../utilities/FaqElements/Summary';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';
import { getReferFriendsLink } from '../../../../helpers/refer-friends';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import DetailsParagraph from '../../../utilities/FaqElements/DetailsParagraph';
import SocialDriveAction from '../../../actions/SocialDriveAction/SocialDriveAction';
import SignupReferralsBlock from '../../../blocks/SignupReferralsBlock/SignupReferralsBlock';

const ReferFriendsTab = () => {
  const referralIncentive = featureFlag('refer_friends_incentive');
  const referFriendsLink = getReferFriendsLink();

  if (!referFriendsLink) {
    return (
      <div className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-7 xxl:col-start-2 xxl:col-span-6">
        <ErrorBlock error="Refer Friends link is undefined. Is the default_referral_campaign_id config set?" />
      </div>
    );
  }

  return (
    <>
      <div className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-7 xxl:col-start-2 xxl:col-span-6">
        <SectionHeader
          underlined
          title={
            referralIncentive
              ? 'Enter to win a $10 gift card'
              : 'Get Your Friends Involved'
          }
        />

        <SocialDriveAction
          title="Refer a friend!"
          description={
            referralIncentive
              ? 'When your friend signs up for their first DoSomething campaign, you’ll both enter for a chance to win a $10 gift card! Every month, we’ll randomly select 50 winners. The more friends you refer, the more chances you have to win. (P.S. There’s no limit on how many friends you can refer!)'
              : 'Share the link below with a friend and invite them to sign up for their first DoSomething campaign! As soon as your friend signs up, you’ll see their name in the Your Referrals section below. Let’s Do This.'
          }
          link={referFriendsLink}
          fullWidth
        />
      </div>

      <div className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-11 xxl:col-start-2 xxl:col-span-10 pt-4">
        <SignupReferralsBlock />
      </div>

      <div className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-7 xxl:col-start-2 xxl:col-span-6 pt-10">
        <SectionHeader underlined title="faq" />

        {referralIncentive ? (
          <Details>
            <Summary summaryText="Who can I refer?" />

            <DetailsParagraph
              detailsText="To earn the chance to win a $10 gift card, you need to refer NEW
              members to DoSomething!"
            />

            <DetailsParagraph
              className="mt-0"
              detailsText="Referring someone who already has a DoSomething account is an
              awesome way to build our movement, but unfortunately, referring
              them won’t enter you for a chance at the gift card."
            />
          </Details>
        ) : (
          <Details>
            <Summary summaryText="Why should I refer a friend?" />

            <DetailsParagraph
              detailsText="You’ll help your friend join our youth-led movement for good, make
              an impact on the causes they care about, and have the chance to
              earn scholarships for volunteering."
            />
          </Details>
        )}

        <Details>
          <Summary summaryText="How do I know that I’ve referred a friend?" />

          <DetailsParagraph
            detailsText="Share the link above with your friend, either via text, email, or
            social media. Using that link, your friend will create a DoSomething
            account and then sign up for a campaign. When they sign up, you’ll
            see their name in the “Your Referrals” section. Yep, that easy."
          />
        </Details>

        {referralIncentive ? (
          <Details>
            <Summary summaryText="How will I receive my gift card if I win?" />

            <DetailsParagraph
              detailsText="We’ll email it to you using the same email address used to create
              your DoSomething account."
            />
          </Details>
        ) : null}

        <Details>
          <Summary summaryText="Where can I find the full rules?" />

          <DetailsParagraph>
            This offer is for a limited time only. See the{' '}
            <a href="/us/refer-a-friend-official-rules" target="_blank">
              Refer A Friend Official Rules.
            </a>
          </DetailsParagraph>
        </Details>
      </div>
    </>
  );
};

export default ReferFriendsTab;
