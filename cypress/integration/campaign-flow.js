describe('My First Test', function() {
  it('Visits the homepage', function() {
    cy.visit('http://phoenix.test');

    cy.get('#ds-login').click();
  });
});
