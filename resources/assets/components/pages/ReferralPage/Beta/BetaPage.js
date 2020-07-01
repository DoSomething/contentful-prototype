import React from 'react';
import gql from 'graphql-tag';

import Query from '../../../Query';
import ErrorPage from '../../ErrorPage';
import MoneyHandImage from './money-hand.svg';
import CampaignLink from './BetaPageCampaignLink';
import GiftCardHandImage from './gift-card-hand.svg';
import ArticleHeader from '../../../utilities/ArticleHeader';
import { featureFlag, query, siteConfig } from '../../../../helpers';
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

  // We'll display a secondary campaign link option for RAF V2.
  const displaySecondaryCampaign =
    featureFlag('refer_friends_v2') && defaultCampaignId !== campaignId;

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
                <ArticleHeader title={`Hey, ${firstName}’s friend!`} />
                <div className="my-6">
                  <img
                    src={
                      featureFlag('refer_friends_v2')
                        ? GiftCardHandImage
                        : MoneyHandImage
                    }
                    alt="Hand with money envelope"
                  />
                </div>
                <div className="my-6">
                  <p>
                    Your friend {firstName} just invited you to volunteer
                    through this campaign from DoSomething.org. Once you
                    complete your first DoSomething campaign, you’ll both
                    increase your chances of winning the campaign scholarship!
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
                  <h4>
                    1. Can I increase my chances of winning the scholarship if I
                    already have a DoSomething account?
                  </h4>
                  <p>
                    Unfortunately, if another DoSomething member sends you a
                    referral link, and you already have a DoSomething account,
                    you won’t get the reward when you sign up for the shared
                    campaign.
                  </p>
                  <h4>2. How will I know if I won the scholarship?</h4>
                  <p>
                    We will email you using the same email address used to
                    create your DoSomething account. Scholarship winners are
                    announced when the campaign closes.
                  </p>
                  <h4>3. Where can I find the full rules?</h4>
                  <p>
                    This offer is for a limited time only. See the{' '}
                    <a href="/us/refer-a-friend-official-rules" target="_blank">
                      Refer A Friend Official Rules.
                    </a>
                  </p>
                  <h3>About Us</h3>
                  <p className="italic">
                    DoSomething is the largest not-for-profit for young people
                    and social change. Using our digital platform, millions of
                    young people make real-world impact through our volunteer,
                    social change, and civic action campaigns. We’ve got
                    hundreds of campaigns to choose from (but only the one above
                    is offering the reward right now). Let’s do this!
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
