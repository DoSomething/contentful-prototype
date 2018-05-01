module.exports = function(migration) {
  const imageMediaBlock = migration
    .createContentType('imageMediaBlock')
    .name('Image Media Block')
    .description('A block of images')
    .displayField('internalTitle');

  imageMediaBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  imageMediaBlock
    .createField('images')
    .name('Images')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Asset',
      validations: [
        {
          linkMimetypeGroup: ['image'],
        },
      ],
    })
    .required(true)
    .localized(false);
};
