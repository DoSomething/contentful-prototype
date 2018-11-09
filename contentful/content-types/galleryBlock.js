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
    .required(true)
    .localized(false);

  galleryBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(false)
    .localized(true);

  galleryBlock
    .createField('blocks')
    .name('Blocks')
    .type('Array')
    .validations([
      {
        size: {
          min: 2,
        },
      },
    ])
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['person', 'campaign', 'page', 'contentBlock'],
        },
      ],
      linkType: 'Entry',
    })
    .required(true)
    .localized(false);

  galleryBlock
    .createField('itemsPerRow')
    .name('Items Per Row')
    .type('Integer')
    .validations([
      {
        in: [2, 3, 4],
      },
    ])
    .required(true)
    .localized(false);

  galleryBlock
    .createField('imageAlignment')
    .name('Image Alignment')
    .type('Symbol')
    .validations([{ in: ['top', 'left'] }])
    .required(true)
    .localized(false);

  galleryBlock
    .createField('imageFit')
    .name('Image Fit')
    .type('Symbol')
    .validations([{ in: ['fill', 'pad'] }])
    .required(false)
    .localized(false);

  galleryBlock.changeEditorInterface('itemsPerRow', 'radio', {
    helpText:
      'The maximum number of items in a single row when viewing the gallery in a large display.',
  });

  galleryBlock.changeEditorInterface('imageAlignment', 'radio', {
    helpText:
      "Determines where the gallery item's images are aligned relative to their text.",
  });

  galleryBlock.changeEditorInterface('imageFit', 'radio', {
    helpText: `Controls the cropping method for the gallery images. 'Fill' will resize the images to ensure they
      fit neatly into a square, cropping the image if needed. 'Pad' will do the same but will add padding
      to the image instead of cropping it.`,
  });
};
