module.exports = function(migration) {
  const postGallery = migration
    .createContentType('postGallery')
    .name('Post Gallery')
    .description('A gallery of user-submitted posts.')
    .displayField('internalTitle');

  postGallery
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true);

  postGallery
    .createField('actionIds')
    .name('Action IDs')
    .type('Array')
    .items({
      type: 'Symbol',
      validations: [
        {
          regexp: {
            pattern: '[0-9]+',
            flags: null,
          },
          message: 'This must be a numeric Action ID.',
        },
      ],
    })
    .localized(false)
    .required(true);

  postGallery
    .createField('itemsPerRow')
    .name('Items Per Row')
    .type('Integer')
    .validations([
      {
        in: [2, 3],
      },
    ])
    .required(true)
    .localized(false);

  postGallery.changeEditorInterface('internalTitle', 'singleLine', {});

  postGallery.changeEditorInterface('actionIds', 'listInput', {
    helpText: `A comma-separated list of one or more Action IDs to display in this gallery. Action IDs
    can be found in Rogue: https://dosome.click/nyshrf`,
  });

  postGallery.changeEditorInterface('itemsPerRow', 'radio', {
    helpText:
      'The maximum number of items in a single row when viewing the gallery in a large display.',
  });
};
