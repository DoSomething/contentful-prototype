import React from 'react';

import ErrorPage from '../../ErrorPage';
import { featureFlag } from '../../../../helpers';
import ArticleHeader from '../../../utilities/ArticleHeader';
import SiteFooter from '../../../utilities/SiteFooter/SiteFooter';
import { getReferFriendsLink } from '../../../../helpers/refer-friends';
import SiteNavigationContainer from '../../../SiteNavigation/SiteNavigationContainer';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const AlphaPage = () =>
  getReferFriendsLink() ? (
    <>
      <SiteNavigationContainer />

      <main className="general-page alpha-referral-page base-12-grid py-3 md:py-6 relative">
        <article className="grid-narrow">
          <ArticleHeader
            title={
              featureFlag('refer_friends_v2')
                ? 'Get your friends involved'
                : 'Want Free Money for School?'
            }
          />
          <div className="my-6">
            <SocialDriveActionContainer
              shareCardDescription={
                featureFlag('refer_friends_v2')
                  ? "Share the link below with a friend and invite them to sign up for their first DoSomething campaign! As soon as your friend signs up, you'll see their name in the Your Referrals section below. Let's Do This."
                  : "Invite your friends to join DoSomething. When your friend completes this campaign, you'll both increase your chances of winning the campaign scholarship! Every friend you refer earns you an additional shot at winning the scholarship. (Psst...there's no limit on how many you can refer!)"
              }
              shareCardTitle="Refer A Friend!"
              link={getReferFriendsLink()}
              fullWidth
            />
          </div>

          <h3>FAQ</h3>

          {featureFlag('refer_friends_v2') ? (
            <>
              <h4>Why should I refer a friends?</h4>
              <p>
                You&apos;ll help your friend join our youth-led movement for
                good, make an impact on the causes they care about, and have the
                chance to earn scholarships for volunteering.
              </p>

              <h4>How do I know that I&apos;ve referred a friend?</h4>
              <p>
                Share the link above with your friend, either via text, email,
                or social media. Using that link, your friend will create a
                DoSomething account and then sign up for a campaign. When they
                sign up, you&apos;ll see their name in the “Your Referrals”
                section. Yep, that easy.
              </p>
            </>
          ) : (
            <>
              <h4>1. Who can I refer?</h4>
              <p>
                Earn your reward for referring NEW members to DoSomething!
                Unfortunately, if you refer someone that already has a
                DoSomething account, you won’t get the reward when they sign up
                for the shared campaign.
              </p>

              <h4>2. How will I know if I won the scholarship?</h4>
              <p>
                We will email you using the same email address used to create
                your DoSomething account. Scholarship winners are announced when
                the campaign closes.
              </p>
            </>
          )}

          <h4>3. Where can I find the full rules?</h4>
          <p>
            This offer is for a limited time only. See the{' '}
            <a href="/us/refer-a-friend-official-rules" target="_blank">
              Refer A Friend Official Rules.
            </a>
          </p>
        </article>
      </main>

      <SiteFooter />
    </>
  ) : (
    <ErrorPage error="Unable to generate referral link." />
  );

export default AlphaPage;
