module.exports = function(migration) {
  const galleryBlock = migration
    .createContentType('galleryBlock')
    .name('Gallery Block')
    .description('Displays a gallery of referenced entries')
    .displayField('internalTitle');
  galleryBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  galleryBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  galleryBlock
    .createField('blocks')
    .name('Blocks')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['campaign', 'contentBlock', 'page', 'person'],
        },
      ],

      linkType: 'Entry',
    });

  galleryBlock
    .createField('itemsPerRow')
    .name('Items Per Row')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        in: [2, 3, 4],
      },
    ])
    .disabled(false)
    .omitted(false);

  galleryBlock
    .createField('imageAlignment')
    .name('Image Alignment')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        in: ['top', 'left'],
      },
    ])
    .disabled(false)
    .omitted(false);

  galleryBlock
    .createField('imageFit')
    .name('Image Fit')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['fill', 'pad'],
      },
    ])
    .disabled(false)
    .omitted(false);

  galleryBlock.changeEditorInterface('internalTitle', 'singleLine', {});
  galleryBlock.changeEditorInterface('title', 'singleLine', {});

  galleryBlock.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });

  galleryBlock.changeEditorInterface('itemsPerRow', 'radio', {
    helpText:
      'The maximum number of items in a single row when viewing the gallery in a large display.',
  });

  galleryBlock.changeEditorInterface('imageAlignment', 'radio', {
    helpText:
      "Determines where the gallery item's images are aligned relative to their text.",
  });

  galleryBlock.changeEditorInterface('imageFit', 'radio', {
    helpText:
      "Controls the cropping method for the gallery images. 'Fill' will resize the images to ensure they fit neatly into a square, cropping the image if needed. 'Pad' will do the same but will add padding to the image instead of cropping it.",
  });
};
