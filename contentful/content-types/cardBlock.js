module.exports = function(migration) {
  const cardBlock = migration
    .createContentType('cardBlock')
    .name('Card Block')
    .description('Text content, displayed within a "card" container.')
    .displayField('internalTitle');

  cardBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  cardBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .localized(true);

  cardBlock
    .createField('content')
    .name('Content')
    .type('Text')
    .required(false)
    .localized(true);

  cardBlock
    .createField('link')
    .name('Link')
    .type('Symbol')
    .required(false)
    .localized(false);

  cardBlock
    .createField('author')
    .name('Author')
    .type('Link')
    .linkType('Entry')
    .required(false)
    .localized(false);

  cardBlock
    .createField('metadata')
    .name('Metadata')
    .type('Link')
    .linkType('Entry')
    .required(false)
    .localized(false);
};
