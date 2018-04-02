module.exports = function (migration) {
  const contentBlock = migration.createContentType('contentBlock')
    .name('Content Block')
    .description('')
    .displayField('internalTitle');

  contentBlock.createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  contentBlock.createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);
}
