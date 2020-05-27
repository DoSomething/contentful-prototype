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
          <ArticleHeader title="Want Free Money for School?" />
          <div className="my-6">
            <SocialDriveActionContainer
              shareCardDescription="Invite your friends to join DoSomething. When your friend completes this campaign, you'll both increase your chances of winning the campaign scholarship! Every friend you refer earns you an additional shot at winning the scholarship. (Psst...there's no limit on how many you can refer!)"
              shareCardTitle="Refer A Friend"
              link={getReferFriendsLink()}
              fullWidth
            />
          </div>

          <h3>FAQ</h3>

          <h4>1. Who can I refer?</h4>

          <p>
            Earn your reward for referring NEW members to DoSomething!
            Unfortunately, if you refer someone that already has a DoSomething
            account, you won’t get the reward when they sign up for the shared
            campaign.
          </p>

          <h4>2. How will I know if I won the scholarship?</h4>

          <p>
            We will email you using the same email address used to create your
            DoSomething account. Scholarship winners are announced when the
            campaign closes.
          </p>

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
    <ErrorPage />
  );

export default AlphaPage;
