/// <reference types="Cypress" />
import { GraphQLError } from 'graphql';

describe('Collection Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Visit a non existent collection page', () => {
    cy.mockGraphqlOp('CollectionPageQuery', {
      collectionPageBySlug: null,
    });

    cy.visit('/us/collections/not-found');

    cy.contains('Not Found');
  });

  it('Visit a collection page with a triggered GraphQL error', () => {
    cy.mockGraphqlOp('CollectionPageQuery', {
      collectionPageBySlug: new GraphQLError('Oops!... I Did It Again'),
    });

    cy.visit('/us/collections/error');

    cy.contains('Something went wrong');
  });

  it('Visit a working collection page', () => {
    cy.mockGraphqlOp('CollectionPageQuery', {
      collectionPageBySlug: {
        title: 'Environment',
        slug: 'collection',
      },
    });

    cy.visit('/us/collections/collection');

    cy.contains('h1', 'Environment');
  });
});
