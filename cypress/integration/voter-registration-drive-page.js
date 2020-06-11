/// <reference types="Cypress" />

import faker from 'faker';

import { userFactory } from '../fixtures/user';

const ovrdPathPage = '/us/my-voter-registration-drive';
const mockUrl = faker.image.imageUrl();
// Mock response for the campaignWebsite query within our VoterRegistrationDrivePageQuery.
const campaignWebsite = {
  campaignId: faker.random.number(),
  title: faker.company.catchPhraseDescriptor(),
  coverImage: {
    url: faker.image.imageUrl(),
    description: faker.company.catchPhraseDescriptor(),
  },
  scholarshipAmount: '1500',
  scholarshipDeadline: '2022-04-25T00:00-08:00',
  additionalContent: null,
  url: mockUrl,
};
const group = {
  id: faker.random.number(),
};

/**
 * @param Object user
 * @return String
 */
function getOvrdPagePathForUser(user) {
  return `${ovrdPathPage}?referrer_user_id=${user.id}`;
}

describe('Voter Registration Drive (OVRD) Page', () => {
  beforeEach(() => {
    cy.configureMocks();
    // Mock the ContentBlock queries used for various sections on the beta OVRD page.
    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'ContentBlock',
        superTitle: faker.lorem.words(),
        title: faker.company.bsBuzz(),
        subTitle: faker.lorem.words(),
        content: faker.lorem.sentence(),
      },
    });
  });

  /** @test */
  it('OVRD page displays NotFoundPage if referrer user ID not present', () => {
    cy.visit(ovrdPathPage);

    cy.findByTestId('not-found-page').should('have.length', 1);
    cy.get('[data-test=voter-registration-drive-page]').should(
      'have.length',
      0,
    );
  });

  /** @test */
  it('OVRD page displays NotFoundPage if referrer user not found', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user: null,
      campaignWebsite,
    });

    cy.visit(getOvrdPagePathForUser(user));

    cy.findByTestId('not-found-page').should('have.length', 1);
    cy.get('[data-test=voter-registration-drive-page]').should(
      'have.length',
      0,
    );
  });

  /** @test */
  it('OVRD banner displays expected info if referrer user found', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(getOvrdPagePathForUser(user));

    cy.findByTestId('not-found-page').should('have.length', 0);
    cy.get('[data-test=voter-registration-drive-page]').should(
      'have.length',
      1,
    );
    cy.findByTestId('campaign-header-subtitle').contains(
      `${user.firstName} wants you to register to vote!`,
    );
    cy.get('[data-test=voter-registration-drive-page-cover-image]').should(
      'have.length',
      1,
    );
    cy.get(
      '[data-test=voter-registration-drive-page-campaign-info-block]',
    ).should('have.length', 1);
    cy.contains('Win A Scholarship');
    cy.get(
      '[data-test=voter-registration-drive-page-campaign-info-block] > article > dl > dd.campaign-info__scholarship',
    ).contains(`$1,500`);
    cy.contains('button', 'View Scholarship Details');
    cy.contains(`April 25th, 2022`);
    cy.get('[data-test=voter-registration-drive-page-blurb]').contains(
      `150,000+ young people have registered to vote via DoSomething. After you register, share with your friends to enter to win a $1,500 scholarship!`,
    );
    cy.findByTestId('voter-registration-form-card').should('have.length', 1);
    cy.findByTestId('voter-registration-form-card').findByText(
      'Register online to vote',
    );
  });

  /** @test */
  it('OVRD quote displays default if no voting-reasons query parameter found', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(getOvrdPagePathForUser(user));

    cy.get('[data-test=voter-registration-drive-page-quote-text]').contains(
      'Voting is one of the most impactful ways to make a difference on the causes that matter to us. Take 2 minutes and register to vote today!',
    );
    cy.get('[data-test=voter-registration-drive-page-quote-byline]').contains(
      `- ${user.firstName}`,
    );
  });

  /** @test */
  it('OVRD quote displays one voting reason when found in voting-reasons query', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(`${getOvrdPagePathForUser(user)}&voting-reasons=student-debt`);

    cy.get('[data-test=voter-registration-drive-page-quote-text]').contains(
      'Voting is one of the most impactful ways to make a difference on the causes that matter to us, like student debt. Take 2 minutes and register to vote today!',
    );
    cy.get('[data-test=voter-registration-drive-page-quote-byline]').contains(
      `- ${user.firstName}`,
    );
  });

  /** @test */
  it('OVRD quote displays two voting reasons when found in voting-reasons query', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(
      `${getOvrdPagePathForUser(
        user,
      )}&voting-reasons=covid-relief,climate-change`,
    );

    cy.get('[data-test=voter-registration-drive-page-quote-text]').contains(
      'Voting is one of the most impactful ways to make a difference on the causes that matter to us, like COVID-19 relief and climate change. Take 2 minutes and register to vote today!',
    );
    cy.get('[data-test=voter-registration-drive-page-quote-byline]').contains(
      `- ${user.firstName}`,
    );
  });

  /** @test */
  it('OVRD quote displays three or more voting reasons when found in voting-reasons query', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(
      `${getOvrdPagePathForUser(
        user,
      )}&voting-reasons=mental-health,climate-change,healthcare,covid-relief`,
    );

    cy.get('[data-test=voter-registration-drive-page-quote-text]').contains(
      'Voting is one of the most impactful ways to make a difference on the causes that matter to us, like mental health, climate change, healthcare, and COVID-19 relief. Take 2 minutes and register to vote today!',
    );
    cy.get('[data-test=voter-registration-drive-page-quote-byline]').contains(
      `- ${user.firstName}`,
    );
  });

  /** @test */
  it('OVRD displays campaign href, expects href to match GraphQL URL returned from query', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(getOvrdPagePathForUser(user));

    // Assert button href is present and contains correct url:
    cy.get('[data-test=visit-voter-registration-campaign-button]')
      .should('have.length', 1)
      .should('have.attr', 'href', mockUrl);
  });

  /** @test */
  it('OVRD Start VR Form button is disabled when form is empty', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(getOvrdPagePathForUser(user));

    cy.findByTestId('voter-registration-submit-button').should('be.disabled');
  });

  /** @test */
  it('OVRD Start VR Form button is enabled when form is filled in', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(getOvrdPagePathForUser(user));

    cy.findByTestId('voter-registration-email-field').type('text@test.com');
    cy.findByTestId('voter-registration-zip-field').type('12345');
    cy.findByTestId('voter-registration-submit-button').should('be.enabled');
  });

  /** @test */
  it('OVRD Start VR Form tracking source contains user and referral key values', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(getOvrdPagePathForUser(user));

    cy.findByTestId('voter-registration-tracking-source').should(
      'have.value',
      `user:${user.id},source:web,source_details:onlinedrivereferral,referral=true`,
    );
  });

  /** @test */
  it('OVRD Start VR Form tracking source contains group_id key value if valid group_id', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
      group,
    });

    cy.visit(`${getOvrdPagePathForUser(user)}&group_id=${group.id}`);

    cy.findByTestId('voter-registration-tracking-source').should(
      'have.value',
      `user:${user.id},source:web,source_details:onlinedrivereferral,group_id=${group.id},referral=true`,
    );
  });

  /** @test */
  it('OVRD <meta> tag has a title and description', () => {
    cy.get('head meta[property="og:title"]').should(
      'have.attr',
      'content',
      'Register to vote with me!',
    );
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      "You can register to vote online... literally right now! It's fast, easy, and requires only basic information like your street address. Let's Do This!",
    );
  });
});
