module.exports = function(migration) {
  const callToAction = migration.editContentType('callToAction');

  // Prod
  // Internal title
  // Display options XX
  // Visual styles XX
  // Ue campaign tagline XX
  // Content
  // Impract prefix XX
  // Impact value XX
  // Impact suffix XX
  // Action text XX

  // Internal title
  // Supertitle ++
  // Title ++
  // Content
  // Link Text ++
  // Link Location ++
  // Template ++
  // Alignment ++

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
    .localized(false)
    .validations([
      {
        regexp: {
          pattern:
            '^((ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$|tel\\:?\\d[ -.]?\\(?\\d\\d\\d\\)?[ -.]?\\d\\d\\d[ -.]?\\d\\d\\d\\d$)',
          message: 'Please provide a valid URL',
        },
      },
    ]);

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
