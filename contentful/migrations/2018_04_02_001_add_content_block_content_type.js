module.exports = function(migration) {
  const contentBlock = migration
    .createContentType('contentBlock')
    .name('Content Block')
    .description(
      'Content block for adding text content with optional titles and single image.',
    )
    .displayField('internalTitle');

  contentBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  contentBlock
    .createField('superTitle')
    .name('Supertitle')
    .type('Symbol')
    .required(false)
    .localized(true);

  contentBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(false)
    .localized(true);

  contentBlock
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .required(false)
    .localized(true);

  contentBlock
    .createField('content')
    .name('Content')
    .type('Text')
    .required(true)
    .localized(true);

  contentBlock
    .createField('image')
    .name('Image')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .localized(false);

  contentBlock
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .required(false)
    .localized(false);
};
