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
        in: [2, 3, 4, 5],
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

  galleryBlock.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  galleryBlock.changeFieldControl('title', 'builtin', 'singleLine', {});

  galleryBlock.changeFieldControl('blocks', 'builtin', 'entryLinksEditor', {
    bulkEditing: false,
  });

  galleryBlock.changeFieldControl('itemsPerRow', 'builtin', 'radio', {
    helpText:
      'The maximum number of items in a single row when viewing the gallery in a large display.',
  });

  galleryBlock.changeFieldControl('imageAlignment', 'builtin', 'radio', {
    helpText:
      "Determines where the gallery item's images are aligned relative to their text.",
  });

  galleryBlock.changeFieldControl('imageFit', 'builtin', 'radio', {
    helpText:
      "Controls the cropping method for the gallery images. 'Fill' will resize the images to ensure they      fit neatly into a square, cropping the image if needed. 'Pad' will do the same but will add padding      to the image instead of cropping it.",
  });
};
