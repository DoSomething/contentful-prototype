/// <reference types="Cypress" />

import faker from 'faker';

describe('Questionnaire Action', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('does not enable submission until all questions are answered with valid character count', () => {
    cy.visit('/us/questionnaire');

    cy.findByTestId('questionnaire-action').within(() => {
      cy.findByTestId('questionnaire-submit-button').should('be.disabled');

      cy.findByTestId('question-1').type(faker.lorem.words());

      cy.findByTestId('questionnaire-submit-button').should('be.disabled');

      cy.findByTestId('question-2').type(faker.random.alphaNumeric(501));

      cy.findByTestId('questionnaire-submit-button').should('be.disabled');

      cy.findByTestId('question-2')
        .clear()
        .type(faker.lorem.words());

      cy.findByTestId('questionnaire-submit-button').should(
        'not.have.attr',
        'disabled',
      );
    });
  });
});
