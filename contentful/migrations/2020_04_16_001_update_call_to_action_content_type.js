// Sets up the following model for the Call To Action content type:
// Internal title
// Supertitle ++
// Title ++
// Content
// Link Text ++
// Link Location ++
// Template ++
// Alignment ++

module.exports = function(migration) {
  const callToAction = migration.editContentType('callToAction');

  callToAction
    .createField('superTitle')
    .name('Supertitle')
    .type('Symbol')
    .required(false)
    .localized(false);

  callToAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  callToAction
    .createField('linkText')
    .name('Link Text')
    .type('Symbol')
    .required(true)
    .localized(false);

  callToAction
    .createField('link')
    .name('Link Location')
    .type('Symbol')
    .required(true)
    .localized(false);

  callToAction
    .createField('template')
    .name('Template')
    .type('Symbol')
    .required(true)
    .localized(false)
    .validations([{ in: ['Purple', 'Yellow', 'Voter Registration'] }]);

  callToAction
    .createField('alignment')
    .name('Alignment')
    .type('Symbol')
    .required(true)
    .localized(false)
    .validations([{ in: ['Left', 'Center'] }]);
};
