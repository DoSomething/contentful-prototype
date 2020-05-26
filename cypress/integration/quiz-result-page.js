/// <reference types="Cypress" />

import faker from 'faker';

import { userFactory } from '../fixtures/user';

const quizResultId = '347iYsbykgQe6KqeGceMUk';

/**
 * @param String id
 * @param Boolean preview
 * @return String
 */
function getQuizResultPath(id) {
  return `/us/quiz-results/${id}`;
}

const linkBlock = {
  id: quizResultId,
  __typename: 'LinkBlock',
  title: faker.company.bsBuzz(),
  content: faker.lorem.sentence(),
};

describe('Quiz Result Page', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Renders NotFound if GraphQL query does not return a block', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: null,
    });

    cy.visit(getQuizResultPath('55767606a59dbf3c7a8b4571'));

    cy.findByTestId('not-found-page').should('have.length', 1);
    cy.findByTestId('quiz-result-page').should('have.length', 0);
  });

  /** @test */
  it('Renders placeholder content if preview query is not passed', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock,
    });

    cy.visit(getQuizResultPath(quizResultId));

    cy.findByTestId('quiz-result-page').should('have.length', 1);
    cy.get('h1').should('contain', linkBlock.title);
    cy.findByTestId('quiz-result-page').contains(
      'Saepe cupiditate non. Facere velit vitae corporis.',
    );
  });

  /** @test */
  it('Renders GraphQL content if preview query parameter is passed', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock,
    });

    cy.visit(`${getQuizResultPath(quizResultId)}?preview=true`);

    cy.get('h1').should('contain', linkBlock.title);
    cy.findByTestId('quiz-result-page').contains(linkBlock.content);
  });

  /** @test */
  it('Sets up the correct tracking source for the RTV redirect URL for an unauthenticated user', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock,
    });

    cy.visit(getQuizResultPath(quizResultId));

    cy.findByTestId('quiz-result-page').should('have.length', 1);
    cy.findByTestId('voter-registration-tracking-source').should(
      'have.value',
      'source:web,source_details:VoterRegQuiz_completed_default',
    );
  });

  /** @test */
  it('Sets up the correct tracking source for the RTV redirect URL for an authenticated user', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock,
    });

    const user = userFactory();

    // Log in & visit the campaign pitch page:
    cy.login(user).visit(getQuizResultPath(quizResultId));

    cy.findByTestId('quiz-result-page').should('have.length', 1);
    cy.findByTestId('voter-registration-tracking-source').should(
      'have.value',
      `user:${user.id},source:web,source_details:VoterRegQuiz_completed_default`,
    );
  });
});
