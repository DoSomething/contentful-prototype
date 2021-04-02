/// <reference types="Cypress" />

import faker from 'faker';

import { userFactory } from '../fixtures/user';
import { newTextPost } from '../fixtures/posts';
import { QUESTIONNAIRES_API } from '../fixtures/constants';

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

  /** @test */
  it('Displays properly formatted field error messages', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'QuestionnaireBlock',
        questions,
      },
    });

    cy.authVisitBlockPermalink(user, '123');

    cy.findByTestId('question-1-input').type(faker.lorem.words());
    cy.findByTestId('question-2-input').type(faker.lorem.words());

    cy.intercept('POST', QUESTIONNAIRES_API, {
      statusCode: 422,
      body: {
        errors: {
          'questions.0.action_id': ['The questions.0.action_id is invalid.'],
          'questions.1.answer': [
            'The questions.1.answer is invalid for arbitrary reasons.',
          ],
        },
      },
    }).as('submitQuestionnaire');

    cy.findByTestId('questionnaire-submit-button').click();

    cy.findByTestId('questionnaire-error-message').contains(
      'Hmm, there were some issues with your submission.',
    );

    cy.findByTestId('questionnaire-field-errors').contains(
      'The question #1 action_id is invalid.',
    );

    cy.findByTestId('questionnaire-field-errors').contains(
      'The question #2 answer is invalid for arbitrary reasons.',
    );

    cy.findByTestId('question-1-title').should('have.class', 'text-red-500');
    cy.findByTestId('question-2-title').should('have.class', 'text-red-500');

    // @TODO: Once the issue where overriding intercepts is resolved, it would be nice to remove the next test,
    // and instead test here directly that previous errors are cleared out following a re-submission of the questionnaire.
    // https://github.com/cypress-io/cypress/issues/9302

    // cy.intercept('POST', QUESTIONNAIRES_API, {
    //   statusCode: 401,
    //   body: {
    //     error: 'access_denied',
    //   },
    // }).as('submitQuestionnaire');

    // cy.findByTestId('question-1-input').clear().type('Something else entirely.');

    // cy.findByTestId('questionnaire-submit-button').click();

    // cy.findByTestId('question-1-title').should(
    //   'not.have.attr',
    //   'class',
    //   'text-red-500',
    // );
    // cy.findByTestId('question-2-title').should(
    //   'not.have.attr',
    //   'class',
    //   'text-red-500',
    // );

    // cy.findByTestId('questionnaire-error-message').contains('access_denied');

    // cy.findByTestId('questionnaire-field-errors').should('have.length', 0);
  });

  /** @test */
  it('Displays machine error messages', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'QuestionnaireBlock',
        questions,
      },
    });

    cy.authVisitBlockPermalink(user, '123');

    cy.findByTestId('question-1-input').type(faker.lorem.words());
    cy.findByTestId('question-2-input').type(faker.lorem.words());

    cy.intercept('POST', QUESTIONNAIRES_API, {
      statusCode: 401,
      body: {
        error: { message: 'access_denied' },
      },
    }).as('submitQuestionnaire');

    cy.findByTestId('questionnaire-submit-button').click();

    cy.findByTestId('questionnaire-error-message').contains('access_denied');

    cy.findByTestId('questionnaire-field-errors').should('have.length', 0);
  });

  it('Redirects to the show submission page after a successful questionnaire submission', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        id: '123',
        __typename: 'QuestionnaireBlock',
        questions,
      },
    });

    cy.withFeatureFlags({
      post_confirmation_page: true,
    }).authVisitBlockPermalink(user, '123');

    cy.findByTestId('question-1-input').type(faker.lorem.words());
    cy.findByTestId('question-2-input').type(faker.lorem.words());

    cy.intercept('POST', QUESTIONNAIRES_API, {
      statusCode: 200,
      body: { data: [{ id: 1 }] },
    }).as('submitQuestionnaire');

    cy.mockGraphqlOp('PostQuery', {
      post: {
        userId: user.id,
      },
    });

    cy.findByTestId('questionnaire-submit-button').click();

    cy.wait('@submitQuestionnaire');

    // We should be redirected to the show submission page after submitting a questionnaire.
    cy.location('pathname').should('eq', '/us/posts/1');
    // We should have appended the Questionnaire Action ID as a query parameter.
    cy.location('search').should('eq', '?submissionActionId=123');

    cy.contains('We Got Your Submission');
  });

  /** @test */
  it('Create Questionnaire, as an anonymous user', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        id: '123',
        __typename: 'QuestionnaireBlock',
        questions,
      },
    });

    cy.withFeatureFlags({
      post_confirmation_page: true,
    }).visit('/us/blocks/123');

    cy.findByTestId('question-1-input').type(faker.lorem.words());
    cy.findByTestId('question-2-input').type(faker.lorem.words());

    cy.intercept('POST', QUESTIONNAIRES_API, {
      statusCode: 200,
      body: { data: [{ id: 1 }] },
    }).as('submitQuestionnaire');

    cy.findByTestId('questionnaire-submit-button')
      .click()
      .handleLogin(user);

    cy.mockGraphqlOp('PostQuery', {
      post: {
        userId: user.id,
      },
    });

    cy.wait('@submitQuestionnaire');

    // We should be redirected to the show submission page after submitting a questionnaire.
    cy.location('pathname').should('eq', '/us/posts/1');
    // We should have appended the Questionnaire Action ID as a query parameter.
    cy.location('search').should('eq', '?submissionActionId=123');

    cy.contains('We Got Your Submission');
  });
});
