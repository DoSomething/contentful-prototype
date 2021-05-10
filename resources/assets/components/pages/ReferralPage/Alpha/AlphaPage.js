import React from 'react';

import ErrorPage from '../../ErrorPage';
import Card from '../../../utilities/Card/Card';
import { featureFlag } from '../../../../helpers/env';
import ArticleHeader from '../../../utilities/ArticleHeader';
import SiteFooter from '../../../utilities/SiteFooter/SiteFooter';
import SiteNavigation from '../../../SiteNavigation/SiteNavigation';
import { getReferFriendsLink } from '../../../../helpers/refer-friends';
import ShortLinkShareContainer from '../../../utilities/ShortLinkShare/ShortLinkShareContainer';

const AlphaPage = () => {
  const referralIncentive = featureFlag('refer_friends_incentive');

  return getReferFriendsLink() ? (
    <>
      <SiteNavigation />

      <main className="general-page alpha-referral-page base-12-grid py-3 md:py-6 relative">
        <article className="grid-narrow">
          <ArticleHeader
            title={`${
              referralIncentive
                ? 'Enter to win a $10 gift card'
                : 'Get your friends involved'
            }`}
          />

          <div className="my-6">
            <div className="clearfix pb-6 lg:flex">
              <Card className="rounded bordered" title="Refer A Friend!">
                <p className="p-3">
                  {referralIncentive
                    ? 'When your friend signs up for their first DoSomething campaign, you’ll both enter for a chance to win a $10 gift card! Every month, we’ll randomly select 50 winners. The more friends you refer, the more chances you have to win. (P.S. There’s no limit on how many friends you can refer!)'
                    : "Share the link below with a friend and invite them to sign up for their first DoSomething campaign! Let's Do This."}
                </p>

                <ShortLinkShareContainer link={getReferFriendsLink()} />
              </Card>
            </div>
          </div>

          <h3>FAQ</h3>

          {referralIncentive ? (
            <>
              <h4>Who can I refer?</h4>
              <p>
                To earn the chance to win a $10 gift card by referring NEW
                members to DoSomething! Referring someone who already has a
                DoSomething account is an awesome way to build our movement, but
                unfortunately, referring them won’t enter you for a chance at
                the gift card.
              </p>
            </>
          ) : (
            <>
              <h4>Why should I refer a friend?</h4>
              <p>
                You&apos;ll help your friend join our youth-led movement for
                good, make an impact on the causes they care about, and have the
                chance to earn scholarships for volunteering.
              </p>
            </>
          )}

          <h4>How do I know that I&apos;ve referred a friend?</h4>
          <p>
            Share the link above with your friend, either via text, email, or
            social media. Using that link, your friend will create a DoSomething
            account and then sign up for a campaign. When they sign up, you’ll
            see their name in the{' '}
            <a href="/us/account/refer-friends" target="_blank">
              Refer a Friend section
            </a>{' '}
            of your profile. Yep, that easy.
          </p>

          {referralIncentive ? (
            <>
              <h4>How will I receive my gift card if I win?</h4>
              <p>
                We’ll email it to you using the same email address used to
                create your DoSomething account.
              </p>
            </>
          ) : null}

          <h4>Where can I find the full rules?</h4>
          <p>
            This offer is for a limited time only. See the{' '}
            <a href="/us/refer-a-friend-official-rules" target="_blank">
              Refer A Friend Official Rules
            </a>
            .
          </p>
        </article>
      </main>

      <SiteFooter />
    </>
  ) : (
    <ErrorPage error="Unable to generate referral link." />
  );
};

export default AlphaPage;
