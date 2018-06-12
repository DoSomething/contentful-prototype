module.exports = function(migration) {
  const page = migration.editContentType('page');

  page
    .createField('socialOverride')
    .name('Social Override')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['socialOverride'] }])
    .required(false);

  page.moveField('socialOverride').beforeField('additionalContent');
};
