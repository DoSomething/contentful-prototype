module.exports = function(migration) {
  const galleryBlock = migration
    .editContentType('galleryBlock')
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
          linkContentType: ['person', 'campaign'],
        },
      ],
      linkType: 'Entry',
    })
    .required(true)
    .localized(false);
};
