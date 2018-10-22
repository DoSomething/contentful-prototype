module.exports = function(migration) {
  const page = migration.editContentType('page');

  page
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .linkType('Asset')
    .validations([{ linkMimetypeGroup: ['image'] }])
    .required(false)
    .localized(false);

  page.moveField('coverImage').beforeField('content');

  page.changeEditorInterface('coverImage', 'assetLinkEditor', {
    helpText: 'The cover Image will display on the page before the content',
  });
};
