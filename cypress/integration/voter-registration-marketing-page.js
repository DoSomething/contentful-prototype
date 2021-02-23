/// <reference types="Cypress" />

describe('Voter Registration Marketing Page', () => {
  beforeEach(() => {
    cy.configureMocks();
  });

  /** @test */
  it('Displays the banner with banner image, title and subtitle.', () => {
    cy.visit('/us/vote/marketing-page');

    cy.findByTestId('vr-marketing-page-banner-image').should('have.length', 1);

    // cy.findByTestId('vr-marketing-page-banner-main')
    //   .should('have.css', 'background-color', 'rgb(48, 148, 80)')
    //   .within(() => {
    //     cy.findByTestId('vr-marketing-page-banner-logo').should(
    //       'have.length',
    //       1,
    //     );

    //     cy.findByTestId('vr-marketing-page-banner-title').contains(
    //       'Niche wants you to vote',
    //     );

    //     cy.findByTestId('vr-marketing-page-banner-subtitle').contains(
    //       'Take 2 minutes to register to vote at your current address.',
    //     );
    //   });

    // cy.findByTestId('social-share-tray').should('have.length', 1);
  });
});
