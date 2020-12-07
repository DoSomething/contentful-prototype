import React from 'react';
import tw from 'twin.macro';

import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const Details = tw.details`pb-4`;
const Summary = tw.summary`font-bold text-base cursor-pointer`;
const DetailsParagraph = tw.p`pt-2`;

const RewardsFaq = () => (
  <>
    <div className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-7 xxl:col-start-2 xxl:col-span-6 pt-10">
      <SectionHeader title="faqs" />

      <Details>
        <Summary>How does DoSomething&apos;s Rewards program work?</Summary>

        <DetailsParagraph>
          Share the link above with your friend, either via text, email, or
          social media. Using that link, your friend will create a DoSomething
          account and then sign up for a campaign. When they sign up, you’ll see
          their name in the “Your Referrals” section. Yep, that easy.
        </DetailsParagraph>
      </Details>

      <Details>
        <Summary>How do the additional scholarship entries work?</Summary>

        <DetailsParagraph>
          We’ll email it to you using the same email address used to create your
          DoSomething account.
        </DetailsParagraph>
      </Details>

      <Details>
        <Summary>What are the terms and conditions?</Summary>

        <DetailsParagraph>
          This offer is for a limited time only. See the{' '}
          <a href="/us/refer-a-friend-official-rules" target="_blank">
            Refer A Friend Official Rules.
          </a>
        </DetailsParagraph>
      </Details>
    </div>
  </>
);

export default RewardsFaq;
