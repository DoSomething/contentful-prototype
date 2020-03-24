import React from 'react';
import tw from 'twin.macro';
import gql from 'graphql-tag';
// import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import Layout from '../../layout';
import GeneralPage from '../../../resources/assets/components/utilities/GeneralPage';
import ArticleHeader from '../../../resources/assets/components/utilities/ArticleHeader';
import MoneyHandImage from '../../../resources/assets/components/pages/ReferralPage/Beta/money-hand.svg';
import CampaignLink from '../../../resources/assets/components/pages/ReferralPage/Beta/BetaPageCampaignLink';

const REFERRAL_PAGE_USER = gql`
  query ReferralPageUserQuery($id: String!) {
    user(id: $id) {
      id
      firstName
    }
  }
`;

// Some little layout helper(s):
const Section = tw.div`my-6`;

const BetaPage = () => {
  // const { query } = useRouter();
  const query = { user_id: '5543dfd6469c64ec7d8b46b3', campaign_id: '9052' };

  const userId = query.user_id;
  const campaignId = query.campaign_id;

  if (!userId || !campaignId) {
    return 'GIMME THAT ?user= PLEASE.';
  }

  const { data, loading, error } = useQuery(REFERRAL_PAGE_USER, {
    variables: { id: userId },
  });

  if (loading) {
    return 'LOADING...';
  }

  if (error) {
    return 'ERR: KABLAM!';
  }

  if (!data.user) {
    return 'ERR: USER NOT FOUND';
  }

  const firstName = data.user.firstName;

  return (
    <Layout>
      <GeneralPage>
        <ArticleHeader title={`Hey, ${firstName}’s friend!`} />
        <Section>
          <img src={MoneyHandImage} alt="Hand with money envelope" />
        </Section>
        <Section>
          <p>
            Your friend {firstName} just invited you to volunteer through this
            campaign from DoSomething.org. Once you complete your first
            DoSomething campaign, you’ll both increase your chances of winning
            the campaign scholarship!
          </p>
        </Section>
        <Section>
          <CampaignLink campaignId={campaignId} userId={userId} />
        </Section>
        <Section>
          <h3>FAQ</h3>
          <h4>
            1. Can I increase my chances of winning the scholarship if I already
            have a DoSomething account?
          </h4>
          <p>
            Unfortunately, if another DoSomething member sends you a referral
            link, and you already have a DoSomething account, you won’t get the
            reward when you sign up for the shared campaign.
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
          <h3>About Us</h3>
          <p css={tw`italic`}>
            DoSomething is the largest not-for-profit for young people and
            social change. Using our digital platform, millions of young people
            make real-world impact through our volunteer, social change, and
            civic action campaigns. We’ve got hundreds of campaigns to choose
            from (but only the one above is offering the reward right now).
            Let’s do this!
          </p>
        </Section>
      </GeneralPage>
    </Layout>
  );
};

export default BetaPage;
