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
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  postGallery
    .createField('actionIds')
    .name('Action IDs')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
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
    });

  postGallery
    .createField('itemsPerRow')
    .name('Items Per Row')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        in: [2, 3],
      },
    ])
    .disabled(false)
    .omitted(false);

  postGallery
    .createField('filterType')
    .name('Filter Type')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        in: ['location', 'none'],
      },
    ])
    .disabled(false)
    .omitted(false);

  postGallery
    .createField('hideReactions')
    .name('Hide Reactions')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  postGallery.changeEditorInterface('internalTitle', 'singleLine', {});

  postGallery.changeEditorInterface('actionIds', 'listInput', {
    helpText:
      'A comma-separated list of one or more Action IDs to display in this gallery. Action IDs\n    can be found in Rogue: https://dosome.click/nyshrf',
  });

  postGallery.changeEditorInterface('itemsPerRow', 'radio', {
    helpText:
      'The maximum number of items in a single row when viewing the gallery in a large display.',
  });

  postGallery.changeEditorInterface('filterType', 'radio', {
    helpText: 'Allow filtering user-submitted posts by a specified type.',
  });

  postGallery.changeEditorInterface('hideReactions', 'boolean', {
    helpText: 'Hide the post reactions for this gallery.',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });
};
