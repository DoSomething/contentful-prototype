/// <reference types="Cypress" />

import faker from 'faker';

describe('Questionnaire Action', () => {
  beforeEach(() => cy.configureMocks());

  const title = 'Register to vote';
  const buttonText = 'Submit!';
  const informationTitle = 'Much more info!';
  const informationContent = 'So much information, oh my!';

  const questions = [
    {
      title: "Who's your biggest inspiration?",
      placeholder: 'My pet snail, Agnes.',
      actionId: 1,
    },
    {
      title: 'Why?',
      placeholder: 'They have an inspired sense of Zen.',
      actionId: 2,
    },
  ];

  /** @test */
  it('Displays the expected content with required fields.', () => {
    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'QuestionnaireBlock',
        title: null,
        questions,
        buttonText: null,
        informationTitle: null,
        informationContent: null,
      },
    });

    cy.visit('/us/blocks/123');

    cy.findByTestId('questionnaire-action').within(() => {
      questions.forEach((question, index) => {
        cy.findByTestId(`question-${index + 1}`).within(() => {
          cy.findByTestId(`question-${index + 1}-title`).contains(
            questions[index].title,
          );

          cy.findByTestId(`question-${index + 1}-input`).should(
            'have.attr',
            'placeholder',
            questions[index].placeholder,
          );
        });
      });

      cy.findByTestId('questionnaire-submit-button').contains('Submit Answers');
      cy.findByTestId('action-information').should('have.length', 0);
    });
  });

  /** @test */
  it('Displays the expected content with customized fields.', () => {
    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'QuestionnaireBlock',
        title,
        questions,
        buttonText,
        informationTitle,
        informationContent,
      },
    });

    cy.visit('/us/blocks/123');

    cy.findByTestId('questionnaire-action').within(() => {
      cy.findByTestId('questionnaire-submit-button').contains(buttonText);

      cy.findByTestId('action-information').contains(informationTitle);

      cy.findByTestId('action-information').contains(informationContent);
    });
  });

  /** @test */
  it('Does not enable submission until all questions are answered with valid character count', () => {
    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'QuestionnaireBlock',
        questions,
      },
    });

    cy.visit('/us/blocks/123');

    cy.findByTestId('questionnaire-action').within(() => {
      cy.findByTestId('questionnaire-submit-button').should('be.disabled');

      cy.findByTestId('question-1-input').type(faker.lorem.words());

      cy.findByTestId('questionnaire-submit-button').should('be.disabled');

      cy.findByTestId('question-2-input').type(faker.random.alphaNumeric(501));

      cy.findByTestId('questionnaire-submit-button').should('be.disabled');

      cy.findByTestId('question-2-input')
        .clear()
        .type(faker.lorem.words());

      cy.findByTestId('questionnaire-submit-button').should(
        'not.have.attr',
        'disabled',
      );
    });
  });
});
