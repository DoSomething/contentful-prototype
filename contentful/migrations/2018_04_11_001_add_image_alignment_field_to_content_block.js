module.exports = function(migration) {
  const contentBlock = migration.editContentType('contentBlock');

  contentBlock
    .createField('imageAlignment')
    .name('Image Alignment')
    .type('Symbol')
    .required(false)
    .validations([{ in: ['Right', 'Left'] }]);

  contentBlock.moveField('imageAlignment').beforeField('additionalContent');
};
