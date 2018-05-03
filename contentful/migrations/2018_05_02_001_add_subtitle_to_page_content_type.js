module.exports = function(migration) {
  const page = migration.editContentType('page');

  page
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .required(false)
    .localized(true);

  page.moveField('subTitle').beforeField('slug');
};
