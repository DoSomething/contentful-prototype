/// <reference types="Cypress" />

import faker from 'faker';

const quizResultPagePath = '/us/quiz-results/';
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

  it('Renders NotFound if GraphQL query does not return a block', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: null,
    });

    cy.visit(getQuizResultPath('55767606a59dbf3c7a8b4571'));

    cy.get('[data-test=not-found-page]').should('have.length', 1);
    cy.get('[data-test=quiz-result-page]').should('have.length', 0);
  });

  it('Renders placeholder content if preview query is not passed', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock,
    });

    cy.visit(getQuizResultPath(quizResultId));

    cy.get('[data-test=quiz-result-page]').should('have.length', 1);
    cy.get('h1').should('contain', linkBlock.title);
    cy.get('[data-test=quiz-result-page]').contains(
      'Saepe cupiditate non. Facere velit vitae corporis.',
    );
  });

  it('Renders GraphQL content if preview query parameter is passed', () => {
    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock,
    });

    cy.visit(`${getQuizResultPath(quizResultId)}?preview=true`);

    cy.get('h1').should('contain', linkBlock.title);
    cy.get('[data-test=quiz-result-page]').contains(linkBlock.content);
  });
});
