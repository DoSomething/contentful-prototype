import faker from 'faker';

import { userFactory } from '../fixtures/user';
import { groupFactory } from '../fixtures/group';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

const blockId = '5APr82PRUm6WHtHF8cwa7K';

/**
 * @param Object user
 * @param String status
 * @return Object
 */
function voterRegPost(user, status) {
  return {
    id: faker.random.number(),
    status,
    user,
  };
}

const contentfulBlockQueryResult = {
  block: {
    id: blockId,
    __typename: 'VoterRegistrationReferralsBlock',
    approvedPostCountActionId: 21,
    title: faker.company.catchPhrase(),
  },
};

describe('Voter Registration Referrals Block', () => {
  beforeEach(() => {
    cy.configureMocks();
    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);
  });

  it('Individual displays three empty icons if user has no referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group: null }],
    });
    cy.mockGraphqlOp('IndividualVoterRegistrationReferralsQuery', {
      posts: [],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.get('.section-header__title').contains(
      contentfulBlockQueryResult.block.title,
    );
    cy.findAllByTestId('referral-list-item-empty').should('have.length', 3);
    cy.findAllByTestId('referral-list-item-completed').should('have.length', 0);
    cy.findByTestId('additional-referrals-count').should('have.length', 0);
  });

  it('Individual displays 2 completed icons if user has 2 completed referrals', () => {
    const user = userFactory();
    const firstCompletedReferralUser = userFactory();
    const secondCompletedReferralUser = userFactory();
    const incompleteReferralUser = userFactory();

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group: null }],
    });
    cy.mockGraphqlOp('IndividualVoterRegistrationReferralsQuery', {
      posts: [
        voterRegPost(firstCompletedReferralUser, 'REGISTER_OVR'),
        voterRegPost(secondCompletedReferralUser, 'REGISTER_FORM'),
        voterRegPost(incompleteReferralUser, 'STEP_2'),
      ],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.findAllByTestId('referral-list-item-completed').should('have.length', 2);
    cy.nth('[data-testid=referral-list-item-completed]', 0).within(() => {
      cy.findByTestId('referral-list-item-label').contains(
        firstCompletedReferralUser.displayName,
      );
    });
    cy.nth('[data-testid=referral-list-item-completed]', 1).within(() => {
      cy.findByTestId('referral-list-item-label').contains(
        secondCompletedReferralUser.displayName,
      );
    });
    cy.findAllByTestId('referral-list-item-empty').should('have.length', 1);
    cy.findByTestId('additional-referrals-count').should('have.length', 0);
  });

  it('Individual displays 3 completed icons and additional count if user has 5 referrals', () => {
    const user = userFactory();
    const firstCompletedReferralUser = userFactory();
    const secondCompletedReferralUser = userFactory();
    const thirdCompletedReferralUser = userFactory();

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group: null }],
    });
    cy.mockGraphqlOp('IndividualVoterRegistrationReferralsQuery', {
      posts: [
        voterRegPost(firstCompletedReferralUser, 'REGISTER_FORM'),
        voterRegPost(secondCompletedReferralUser, 'REGISTER_OVR'),
        // Users may have multiple voter registration posts.
        voterRegPost(thirdCompletedReferralUser, 'STEP_3'),
        voterRegPost(thirdCompletedReferralUser, 'STEP_2'),
        voterRegPost(thirdCompletedReferralUser, 'REGISTER_OVR'),
        voterRegPost(userFactory(), 'STEP_1'),
        voterRegPost(userFactory(), 'REGISTER_OVR'),
        voterRegPost(userFactory(), 'REJECTED'),
        voterRegPost(userFactory(), 'REGISTER_FORM'),
      ],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.findAllByTestId('referral-list-item-completed').should('have.length', 3);
    cy.nth('[data-testid=referral-list-item-completed]', 0).within(() => {
      cy.findByTestId('referral-list-item-label').contains(
        firstCompletedReferralUser.displayName,
      );
    });
    cy.nth('[data-testid=referral-list-item-completed]', 1).within(() => {
      cy.findByTestId('referral-list-item-label').contains(
        secondCompletedReferralUser.displayName,
      );
    });
    cy.nth('[data-testid=referral-list-item-completed]', 2).within(() => {
      cy.findByTestId('referral-list-item-label').contains(
        thirdCompletedReferralUser.displayName,
      );
    });
    cy.findAllByTestId('referral-list-item-empty').should('have.length', 0);
    cy.findByTestId('additional-referrals-count').contains('+ 2 more');
  });

  it('Group displays group goal, group referrals count, and individual referrals count', () => {
    const user = userFactory();
    const group = groupFactory();

    const percentCompleted = Math.round((5 / group.goal) * 100);

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group }],
    });
    cy.mockGraphqlOp('GroupVoterRegistrationReferralsQuery', {
      voterRegistrationsCountByGroupId: 5,
      voterRegistrationsCountByReferrerUserId: 12,
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.get('.section-header__title').contains(
      `${group.groupType.name}: ${group.name}`,
    );
    cy.findAllByTestId('group-goal')
      .get('span')
      .contains('Your group’s registration goal');
    cy.findAllByTestId('group-goal')
      .get('h2')
      .contains(group.goal);
    cy.findAllByTestId('group-goal')
      .get('span')
      .contains('People your group has registered');
    cy.findAllByTestId('group-total')
      .get('h2')
      .contains(5);
    cy.findAllByTestId('individual-total')
      .get('span')
      .contains('People you have registered');
    cy.findAllByTestId('individual-total')
      .get('h2')
      .contains(12);
    cy.findAllByTestId('group-progress').contains(
      `${percentCompleted}% to your goal!`,
    );
  });

  it('Group displays group goal as 50 if not set on group', () => {
    const user = userFactory();
    const group = groupFactory();
    group.goal = null;

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group }],
    });
    cy.mockGraphqlOp('GroupVoterRegistrationReferralsQuery', {
      voterRegistrationsCountByGroupId: 15,
      voterRegistrationsCountByReferrerUserId: 0,
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.findAllByTestId('group-goal').contains(50);
    cy.findAllByTestId('group-total').contains(15);
    cy.findAllByTestId('individual-total').contains(0);
  });

  it('Group displays group progress if over the group goal', () => {
    const user = userFactory();
    const group = groupFactory();
    group.goal = 3;

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group }],
    });
    cy.mockGraphqlOp('GroupVoterRegistrationReferralsQuery', {
      voterRegistrationsCountByGroupId: 5,
      voterRegistrationsCountByReferrerUserId: 1,
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.findAllByTestId('group-goal').contains(3);
    cy.findAllByTestId('group-total').contains(5);
    cy.findAllByTestId('group-progress').contains(
      "🎉 You're at 167% of your goal! 🎉",
    );
  });
});
