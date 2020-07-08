import React from 'react';

import ErrorPage from '../../ErrorPage';
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
          <ArticleHeader title="Get your friends involved" />

          <div className="my-6">
            <SocialDriveActionContainer
              shareCardDescription="Share the link below with a friend and invite them to sign up for their first DoSomething campaign! Let's Do This."
              shareCardTitle="Refer A Friend!"
              link={getReferFriendsLink()}
              fullWidth
            />
          </div>

          <h3>FAQ</h3>

          <h4>Why should I refer a friend?</h4>
          <p>
            You&apos;ll help your friend join our youth-led movement for good,
            make an impact on the causes they care about, and have the chance to
            earn scholarships for volunteering.
          </p>

          <h4>How do I know that I&apos;ve referred a friend?</h4>
          <p>
            Share the link above with your friend, either via text, email, or
            social media. Using that link, your friend will create a DoSomething
            account and then sign up for a campaign. When they sign up, you’ll
            see their name in the{' '}
            <a href="/us/account/refer-friends">Refer a Friend section</a> of
            your profile. Yep, that easy.
          </p>

          <h4>Where can I find the full rules?</h4>
          <p>
            This offer is for a limited time only. See the{' '}
            <a href="/us/refer-a-friend-official-rules">
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

export default AlphaPage;
