import React from 'react';
import gql from 'graphql-tag';

import Query from '../../../Query';
import ErrorPage from '../../ErrorPage';
import { query } from '../../../../helpers/url';
import CampaignLink from './BetaPageCampaignLink';
import ArticleHeader from '../../../utilities/ArticleHeader';
import { siteConfig, featureFlag } from '../../../../helpers/env';
import { getReferralCampaignId } from '../../../../helpers/refer-friends';

export const REFERRAL_USER_QUERY = gql`
  query ReferralUserQuery($id: String!) {
    user(id: $id) {
      id
      firstName
    }
  }
`;

const BetaPage = () => {
  const userId = query('user_id');
  const campaignId = getReferralCampaignId();

  const defaultCampaignId = siteConfig('default_referral_campaign_id');

  const displaySecondaryCampaign = defaultCampaignId !== campaignId;

  const referralIncentive = featureFlag('refer_friends_incentive');

  if (!userId || !campaignId) {
    return <ErrorPage error="Missing User ID or Campaign ID." />;
  }

  return (
    // We *do not* render a SiteNavigationContainer here to avoid losing the referral metadata (see https://git.io/JeX2A).
    <Query query={REFERRAL_USER_QUERY} variables={{ id: userId }}>
      {data => {
        if (!data.user) {
          return <ErrorPage error={`User not found for ID: ${userId}.`} />;
        }

        const firstName = data.user.firstName;

        return (
          <div className="main general-page base-12-grid py-3 md:py-6">
            <div className="grid-narrow">
              <div className="my-6">
                <ArticleHeader title={`${firstName} invited you!`} />

                <div className="my-6">
                  <p>
                    {referralIncentive
                      ? `${firstName} invited you to join this campaign (and enter for a chance to win a $10 gift card) through DoSomething! Once you sign up for the campaign below, you and ${firstName} will both have a chance at the gift card! We’ll select 50 winners every month.`
                      : `Your friend ${firstName} thinks that you'd be interested in joining DoSomething, the largest not-for-profit exclusively focused on young people and social change! Sign up for your first campaign. Let's do this!`}
                  </p>
                </div>

                <div
                  className="my-6"
                  data-testid="primary-campaign-referral-link"
                >
                  <CampaignLink campaignId={campaignId} userId={userId} />
                </div>

                {displaySecondaryCampaign ? (
                  <div
                    className="my-6"
                    data-testid="secondary-campaign-referral-link"
                  >
                    <p className="font-bold mb-3">
                      {`Interested in doing a different campaign${
                        referralIncentive ? ' to get a gift card' : ''
                      }?`}
                    </p>

                    <CampaignLink
                      campaignId={defaultCampaignId}
                      userId={userId}
                    />
                  </div>
                ) : null}

                <div className="my-6">
                  <h3>FAQ</h3>

                  {referralIncentive ? (
                    <>
                      <h4>
                        Can I still enter for the $10 gift card if I already
                        have a DoSomething account?
                      </h4>
                      <p>
                        So glad to have you as a member already! Unfortunately,
                        if another DoSomething member sends you a referral link
                        and you already have a DoSomething account, you won’t be
                        eligible to win the gift card when you sign up for the
                        shared campaign.
                      </p>

                      <h4>How do I know that I won a $10 gift card?</h4>
                      <p>
                        Every 2 weeks, we’ll randomly select 25 winners. We’ll
                        email it to you using the same email address used to
                        create your DoSomething account.
                      </p>

                      <h4>What is DoSomething.org?</h4>
                      <p>
                        DoSomething.org is the largest not-for-profit for young
                        people and social change. Using our digital platform,
                        millions of young people make real-world impact through
                        our volunteer, social change, and civic action
                        campaigns. We’ve got hundreds of campaigns to choose
                        from (but only the{' '}
                        {displaySecondaryCampaign
                          ? 'two above are'
                          : 'one above is'}{' '}
                        offering the gift card reward right now). Check out all
                        the{' '}
                        <a
                          href="https://2019.dosomething.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          impact our members made last year
                        </a>
                        . Let’s Do This!
                      </p>
                    </>
                  ) : (
                    <>
                      <h4>What is DoSomething.org?</h4>
                      <p>
                        DoSomething.org is the largest not-for-profit for young
                        people and social change, with members representing
                        every US area code and 131 countries. Using our digital
                        platform, millions of young people make real-world
                        impact through our volunteer, social change, and civic
                        action campaigns.
                      </p>

                      <h4>
                        How do I sign up to join DoSomething with {firstName}?
                      </h4>
                      <p>
                        Easy! Just sign up for a DoSomething campaign, and boom!
                        You&apos;re ready to take action.
                      </p>

                      <h4>Why should I join DoSomething?</h4>
                      <p>
                        Because your friend said so! (Jk.) DoSomething members
                        can make an impact with millions of other young people
                        and earn the chance to win scholarships for
                        volunteering. Plus, you’ll have access to all our
                        newsletters, content, and competitions...not to mention
                        a shot to win merch, experiences and other prizes too.
                      </p>
                    </>
                  )}

                  <h4>Where can I find the full rules?</h4>
                  <p>
                    This offer is for a limited time only. See the{' '}
                    <a href="/us/refer-a-friend-official-rules" target="_blank">
                      Refer A Friend Official Rules
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default BetaPage;
