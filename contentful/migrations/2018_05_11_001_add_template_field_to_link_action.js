module.exports = function(migration) {
  const linkAction = migration.editContentType('linkAction');

  linkAction
    .createField('template')
    .name('Template')
    .type('Symbol')
    .required(false)
    .validations([{ in: ['default', 'cta'] }]);
};
