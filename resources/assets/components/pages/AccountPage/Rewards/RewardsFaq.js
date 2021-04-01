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
          reserves the right to reset rewards in the future.{' '}
          <a
            href="/us/about/terms-and-conditions-scholarship-entries"
            target="_blank"
          >
            See the terms and conditions
          </a>
          .)
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
          applies to all eligible campaigns you complete where the winner is
          selected at random.
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
          You can find the{' '}
          <a
            href="/us/about/terms-and-conditions-scholarship-entries"
            target="_blank"
          >
            DoSomething Rewards Terms and Conditions here
          </a>
          .
        </DetailsParagraph>
      </Details>
    </div>
  </>
);

export default RewardsFaq;
