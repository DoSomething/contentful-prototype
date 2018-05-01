module.exports = function(migration) {
  const imagesBlock = migration
    .createContentType('imagesBlock')
    .name('Images Block')
    .description('A block of images')
    .displayField('internalTitle');

  imagesBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  imagesBlock
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
