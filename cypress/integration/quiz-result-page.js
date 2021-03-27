/// <reference types="Cypress" />

import faker from 'faker';

import { userFactory } from '../fixtures/user';

const quizResultPath = '/us/quiz-results/347iYsbykgQe6KqeGceMUk';

/**
 * @param {String} sourceDetails
 * @param {Boolean} hasAsset
 * @return {Object}
 */
const linkBlock = (sourceDetails, hasAsset = true) => {
  return {
    id: '347iYsbykgQe6KqeGceMUk',
    __typename: 'LinkBlock',
    title: faker.company.bsBuzz(),
    content: faker.lorem.sentence(),
    additionalContent: sourceDetails ? { sourceDetails } : null,
    affiliateLogo: hasAsset ? { id: '2KfkCOTi7u4CqAyyCuGyci' } : null,
  };
};

describe('Quiz Result Page', () => {
  beforeEach(() => {
    cy.configureMocks();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: null,
    });
  });

  /** @test */
  it('Renders NotFound if GraphQL query does not return a block', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: null,
    });

    cy.visit(quizResultPath);

    cy.findByTestId('not-found-page').should('have.length', 1);
    cy.findByTestId('quiz-result-page').should('have.length', 0);
  });

  /** @test */
  // @UPDATE (2021-03-26): The faker.image.imageUrl() that is generated is for lorempixel.com, and in my current tests the site was
  // taking a while to load or possibly down, so the test kept failing!
  // @TODO: We should not use an external service image URL and likely refer to an image we host in cypress directory for testing.
  it('Renders GraphQL title, header asset, content', () => {
    const block = linkBlock('sourceDetails');
    // const imageUrl = faker.image.imageUrl();

    cy.mockGraphqlOp('QuizResultPageQuery', {
      block,
    });

    // cy.mockGraphqlOp('ContentfulAssetQuery', {
    //   asset: {
    //     url: imageUrl,
    //   },
    // });

    cy.visit(quizResultPath);

    cy.findByTestId('quiz-result-page').should('have.length', 1);
    // @TODO re-enable this assertion once we get to the bottom of https://dosomething.slack.com/archives/CUQMU4Q6B/p1596121916013700.
    // cy.get('header img').should('have.attr', 'src', imageUrl);
    cy.get('h1').should('contain', block.title);
    cy.findByTestId('quiz-result-page').contains(block.content);
  });

  it('Does not display header image if asset is null', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock('sourceDetails', false),
    });

    cy.visit(quizResultPath);

    cy.get('header img').should('have.length', 0);
  });

  /** @test */
  it('Does not display registration form if source detail is null', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock(null, false),
    });

    cy.visit(quizResultPath);

    cy.findByTestId('quiz-result-page').should('have.length', 1);
    cy.findByTestId('quiz-result-page-registration-section').should(
      'have.length',
      0,
    );
  });

  /** @test */
  it('Displays registration form if source detail is set', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock('VoterRegQuiz_completed_notsure'),
    });

    cy.visit(quizResultPath);

    cy.findByTestId('quiz-result-page-registration-section').should(
      'have.length',
      1,
    );
    cy.findByTestId('voter-registration-tracking-source').should(
      'have.value',
      'source:web,source_details:VoterRegQuiz_completed_notsure',
    );
  });
});
