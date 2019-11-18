import React from 'react';
import gql from 'graphql-tag';

import Query from '../../../Query';
import GiftCardImage from './gift-card.svg';
import { query } from '../../../../helpers';
import CampaignLink from './BetaPageCampaignLink';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';

const REFERRAL_PAGE_USER = gql`
  query ReferralPageUserQuery($id: String!) {
    user(id: $id) {
      id
      firstName
    }
  }
`;

const SECONDARY_CAMPAIGN_ID = '7951';
const SECONDARY_CAMPAIGN_PROMPT =
  'In less than 5 minutes, you can join 193,242 young people putting an end to gun violence.';

const BetaPage = () => {
  const userId = query('user_id');

  if (!userId) {
    return <ErrorBlock />;
  }

  const campaignId = query('campaign_id');
  const displayPrimaryCampaign =
    campaignId && campaignId !== SECONDARY_CAMPAIGN_ID;

  return (
    <Query query={REFERRAL_PAGE_USER} variables={{ id: userId }}>
      {data => {
        if (!data.user) {
          return <ErrorBlock />;
        }

        const firstName = data.user.firstName;

        return (
          <div className="main general-page base-12-grid">
            <div className="grid-narrow">
              <div className="my-6">
                <div className="general-page__heading text-center">
                  <h1 className="general-page__title uppercase">
                    Hi {firstName}’s friend!
                  </h1>
                </div>
                <div className="my-6">
                  <img src={GiftCardImage} alt="Gift card" />
                </div>
                <div className="my-6">
                  <p>
                    {firstName} just signed up for this campaign from
                    DoSomething.org. Once you sign up for your first DoSomething
                    campaign, you’ll both earn a $5 gift card!
                  </p>
                </div>
                {displayPrimaryCampaign ? (
                  <React.Fragment>
                    <div className="my-6">
                      <CampaignLink campaignId={campaignId} userId={userId} />
                    </div>
                    <div className="my-6">
                      <p>
                        <strong>
                          Interested in doing a different campaign to get your
                          gift card?
                        </strong>{' '}
                        {SECONDARY_CAMPAIGN_PROMPT}
                      </p>
                    </div>
                  </React.Fragment>
                ) : null}
                <div className="my-6">
                  <CampaignLink
                    campaignId={SECONDARY_CAMPAIGN_ID}
                    userId={userId}
                  />
                </div>
                <div className="my-6">
                  <h3>FAQ</h3>
                  <h4>
                    1. Can I get the $5 gift card if I already have a
                    DoSomething account?
                  </h4>
                  <p>
                    Unfortunately, if another DoSomething member sends you a
                    referral link, and you already have a DoSomething account,
                    you won’t get the reward when you sign up for the shared
                    campaign.
                  </p>
                  <h4>2. How will I get my gift card?</h4>
                  <p>
                    We will email it to you using the same email address used to
                    create your DoSomething account.
                  </p>
                  <h4>3. Where can I find the full rules?</h4>
                  <p>
                    This offer is for a limited time only. See the{' '}
                    <a href="/us/refer-a-friend-official-rules" target="_blank">
                      Refer A Friend Official Rules.
                    </a>
                  </p>
                  <h3>About Us</h3>
                  <p>
                    DoSomething is the largest not-for-profit for young people
                    and social change. Using our digital platform, millions of
                    young people make real-world impact through our volunteer,
                    social change, and civic action campaigns. We’ve got
                    hundreds of campaigns to choose from (but only the two above
                    are offering the gift card reward right now). Let’s do this!
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
