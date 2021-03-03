/// <reference types="Cypress" />

describe('Voter Registration Marketing Page', () => {
  beforeEach(() => {
    cy.configureMocks();
  });

  const title = 'Register to vote';
  const subTitle = 'We are an influencer!';
  const slug = 'niche';
  const coverImage = {
    url: 'https://via.placeholder.com/500',
  };

  /** @test */
  it('Displays the expected content with required fields.', () => {
    cy.mockGraphqlOp('VoterRegistrationMarketingPageQuery', {
      voterRegistrationMarketingPageBySlug: {
        slug,
        title,
        subTitle,
        coverImage,
        logo: null,
        content: {},
        source: null,
        sourceDetails: null,
      },
    });

    cy.visit('/us/vote/niche');

    cy.findByTestId('vr-marketing-page-banner-image').should('have.length', 1);

    cy.findByTestId('vr-marketing-page-banner-main').within(() => {
      cy.findByTestId('vr-marketing-page-banner-logo').should('have.length', 0);

      cy.findByTestId('vr-marketing-page-banner-title').contains(title);

      cy.findByTestId('vr-marketing-page-banner-subtitle').contains(subTitle);

      cy.findByTestId('voter-registration-form').within(() => {
        cy.findByTestId('voter-registration-tracking-source').should(
          'have.value',
          'source:web,source_details:voter_registration_marketing_page',
        );
      });
    });

    cy.findByTestId('social-share-tray').should('have.length', 1);

    cy.findByTestId('section-block').should('have.length', 1);
  });

  /** @test */
  it('Displays the expected content with optional customization fields.', () => {
    const fuchsia = '#FF00FF';
    const fuchsiaRgb = 'rgb(255, 0, 255)';
    const bannerBackgroundColor = fuchsia;
    const titleColor = fuchsia;
    const subTitleColor = fuchsia;
    const logo = {
      url: 'https://via.placeholder.com/250',
    };
    const voterRegistrationFormButtonText = 'Vote!!';
    const voterRegistrationFormButtonColor = fuchsia;
    const source = 'marketing-partner';
    const sourceDetails = 'niche';

    cy.mockGraphqlOp('VoterRegistrationMarketingPageQuery', {
      voterRegistrationMarketingPageBySlug: {
        slug,
        bannerBackgroundColor,
        title,
        titleColor,
        subTitle,
        subTitleColor,
        coverImage,
        logo,
        content: {},
        voterRegistrationFormButtonText,
        voterRegistrationFormButtonColor,
        source,
        sourceDetails,
      },
    });

    cy.visit('/us/vote/niche');

    cy.findByTestId('vr-marketing-page-banner-main')
      .should('have.css', 'background-color', fuchsiaRgb)
      .within(() => {
        cy.findByTestId('vr-marketing-page-banner-logo').should(
          'have.length',
          1,
        );

        cy.findByTestId('vr-marketing-page-banner-title').should(
          'have.css',
          'color',
          fuchsiaRgb,
        );

        cy.findByTestId('vr-marketing-page-banner-subtitle').should(
          'have.css',
          'color',
          fuchsiaRgb,
        );

        cy.findByTestId('voter-registration-form').within(() => {
          cy.findByTestId('voter-registration-tracking-source').should(
            'have.value',
            `source:${source},source_details:${sourceDetails}`,
          );

          cy.findByTestId('voter-registration-email-field').type(
            'first-time-voter@civic-legend.gov',
          );
          cy.findByTestId('voter-registration-zip-field').type('11213');

          cy.findByTestId('voter-registration-submit-button')
            .should('have.css', 'background-color', fuchsiaRgb)
            .contains(voterRegistrationFormButtonText);
        });
      });
  });
});
