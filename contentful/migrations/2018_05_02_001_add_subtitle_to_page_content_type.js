module.exports = function(migration) {
  const page = migration.editContentType('page');

  page
    .createField('subtitle')
    .name('Subtitle')
    .type('Symbol')
    .required(false)
    .localized(true);

  page.moveField('subtitle').beforeField('slug');
};
