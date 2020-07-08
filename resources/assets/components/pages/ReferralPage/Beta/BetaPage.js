import React from 'react';
import gql from 'graphql-tag';

import Query from '../../../Query';
import ErrorPage from '../../ErrorPage';
import CampaignLink from './BetaPageCampaignLink';
import GiftCardHandImage from './gift-card-hand.svg';
import { query, siteConfig } from '../../../../helpers';
import ArticleHeader from '../../../utilities/ArticleHeader';
import { getReferralCampaignId } from '../../../../helpers/refer-friends';

const REFERRAL_PAGE_USER = gql`
  query ReferralPageUserQuery($id: String!) {
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

  if (!userId || !campaignId) {
    return <ErrorPage error="Missing User ID or Campaign ID." />;
  }

  return (
    // We *do not* render a SiteNavigationContainer here to avoid losing the referral metadata (see https://git.io/JeX2A).
    <Query query={REFERRAL_PAGE_USER} variables={{ id: userId }}>
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
                  <img src={GiftCardHandImage} alt="Hand with money envelope" />
                </div>

                <div className="my-6">
                  <p>
                    Your friend {firstName} thinks that you&apos;d be interested
                    in joining DoSomething, the largest not-for-profit
                    exclusively focused on young people and social change! Sign
                    up for your first campaign. Let&apos;s do this!
                  </p>
                </div>

                <div className="my-6">
                  <CampaignLink campaignId={campaignId} userId={userId} />
                </div>

                {displaySecondaryCampaign ? (
                  <div
                    className="my-6"
                    data-testid="secondary-campaign-referral-link"
                  >
                    <p className="font-bold mb-3">
                      Interested in doing a different campaign?
                    </p>

                    <CampaignLink
                      campaignId={defaultCampaignId}
                      userId={userId}
                    />
                  </div>
                ) : null}

                <div className="my-6">
                  <h3>FAQ</h3>

                  <h4>What is DoSomething.org?</h4>
                  <p>
                    DoSomething.org is the largest not-for-profit for young
                    people and social change, with members representing every US
                    area code and 131 countries. Using our digital platform,
                    millions of young people make real-world impact through our
                    volunteer, social change, and civic action campaigns.
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
                    Because your friend said so! (Jk.) DoSomething members can
                    make an impact with millions of other young people and earn
                    the chance to win scholarships for volunteering. Plus,
                    you’ll have access to all our newsletters, content, and
                    competitions...not to mention a shot to win merch,
                    experiences and other prizes too.
                  </p>

                  <h4>Where can I find the full rules?</h4>
                  <p>
                    This offer is for a limited time only. See the{' '}
                    <a href="/us/refer-a-friend-official-rules">
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
