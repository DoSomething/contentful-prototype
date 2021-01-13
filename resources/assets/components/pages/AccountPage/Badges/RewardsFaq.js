import React from 'react';

import Details from '../../../utilities/FaqElements/Details';
import Summary from '../../../utilities/FaqElements/Summary';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import DetailsParagraph from '../../../utilities/FaqElements/DetailsParagraph';

// @TODO : get feedback on styling for FAQ section and add new terms and conditions link

const RewardsFaq = () => (
  <>
    <div
      data-testid="rewards-tab-faq"
      className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-7 xxl:col-start-2 xxl:col-span-6 pt-10"
    >
      <SectionHeader title="faqs" />

      <Details>
        <Summary text="How does DoSomething's Rewards program work?" />

        <DetailsParagraph>
          Earn badges to level up. Enjoy your rewards. Let’s Do This!
        </DetailsParagraph>

        <DetailsParagraph className="mt-0">
          (The fine print, because our lawyers said so: Under the current terms
          and conditions of our program, rewards do not reset. DoSomething
          reserves the right to reset rewards in the future. See the terms and
          conditions.)
        </DetailsParagraph>
      </Details>

      <Details>
        <Summary text="How do the additional scholarship entries work?" />

        <DetailsParagraph>
          Once you reach a new level, you will earn the additional scholarship
          entries for all future campaigns that you complete. For instance, if
          you become a Doer and complete a DoSomething campaign, you’ll earn 2
          chances to win that campaign’s scholarship instead of one. As a
          SuperDoer, you’ll earn 3 scholarship entries instead of 1 entry. And
          as a Legend you’ll earn 4 scholarship entries instead of 1. This
          applies to all campaigns you complete.
        </DetailsParagraph>

        <DetailsParagraph className="mt-0">
          For most campaigns, simply completing the campaign earns you a
          scholarship entry. For campaigns where the impact you make determines
          your entries into the scholarship contest, your chances to win will be
          multiplied by your impact. For example, take a campaign that offers a
          scholarship entry for each pair of jeans you donate. If you’re a
          SuperDoer (3x scholarship entries) and donate 10 pairs of jeans, your
          impact will be multiplied by 3 and you’ll earn 30 entries into the
          scholarship contest.
        </DetailsParagraph>

        <DetailsParagraph className="mt-0">
          <a href="/us/about/easy-scholarships" target="_blank">
            Learn more about DoSomething scholarships.
          </a>
        </DetailsParagraph>
      </Details>

      <Details>
        <Summary text="What are the terms and conditions?" />

        <DetailsParagraph>
          See DoSomething Rewards terms and conditions.
        </DetailsParagraph>
      </Details>
    </div>
  </>
);

export default RewardsFaq;
