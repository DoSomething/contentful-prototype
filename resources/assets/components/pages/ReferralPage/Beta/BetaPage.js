import React from 'react';
import gql from 'graphql-tag';

import Query from '../../../Query';
import ErrorPage from '../../ErrorPage';
import { query } from '../../../../helpers';
import MoneyHandImage from './money-hand.svg';
import CampaignLink from './BetaPageCampaignLink';
import {
  REFERRAL_CAMPAIGN_IDS,
  DEFAULT_REFERRAL_CAMPAIGN_ID,
} from '../../../../constants';

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

  if (!userId) {
    return <ErrorPage />;
  }

  const queryCampaignId = query('campaign_id');

  const campaignId = REFERRAL_CAMPAIGN_IDS.includes(queryCampaignId)
    ? queryCampaignId
    : DEFAULT_REFERRAL_CAMPAIGN_ID;

  return (
    // We *do not* render a SiteNavigationContainer here to avoid losing the referral metadata (see https://git.io/JeX2A).
    <Query query={REFERRAL_PAGE_USER} variables={{ id: userId }}>
      {data => {
        if (!data.user) {
          return <ErrorPage />;
        }

        const firstName = data.user.firstName;

        return (
          <div className="main general-page base-12-grid">
            <div className="grid-narrow">
              <div className="my-6">
                <div className="general-page__heading text-center">
                  <h1 className="general-page__title uppercase">
                    Hey, {firstName}’s friend!
                  </h1>
                </div>
                <div className="my-6">
                  <img src={MoneyHandImage} alt="Hand with money envelope" />
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
