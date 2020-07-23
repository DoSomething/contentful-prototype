/// <reference types="Cypress" />

import faker from 'faker';

import { userFactory } from '../fixtures/user';

const quizResultId = '347iYsbykgQe6KqeGceMUk';
const quizResultPath = `/us/quiz-results/${quizResultId}`;

/**
 * @param {String} sourceDetails
 * @param {Boolean} hasAsset
 * @return {Object}
 */
const linkBlock = (sourceDetails, hasAsset = true) => {
  return {
    id: quizResultId,
    __typename: 'LinkBlock',
    title: faker.company.bsBuzz(),
    content: faker.lorem.sentence(),
    additionalContent: sourceDetails ? { sourceDetails } : null,
    affilliateLogo: hasAsset ? { id: '2KfkCOTi7u4CqAyyCuGyci' } : null,
  };
};

describe('Quiz Result Page', () => {
  beforeEach(() => cy.configureMocks());

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
  it('Renders GraphQL title and content', () => {
    const block = linkBlock(null);

    cy.mockGraphqlOp('QuizResultPageQuery', {
      block,
    });

    cy.visit(quizResultPath);

    cy.findByTestId('quiz-result-page').should('have.length', 1);
    cy.get('h1').should('contain', block.title);
    cy.findByTestId('quiz-result-page').contains(block.content);
  });

  /** @test */
  it('Does not display registration form if source detail is null', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock(null, false),
    });

    cy.visit(quizResultPath);

    cy.findByTestId('quiz-result-page').should('have.length', 1);
    cy.findByTestId('voter-registration-form-card').should('have.length', 0);
  });

  /** @test */
  it('Displays registration form if source detail is set', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock('VoterRegQuiz_completed_notsure'),
    });

    cy.visit(quizResultPath);

    cy.findByTestId('quiz-result-page').should('have.length', 1);
    cy.findByTestId('voter-registration-tracking-source').should(
      'have.value',
      'source:web,source_details:VoterRegQuiz_completed_notsure',
    );
  });
});
