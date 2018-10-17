module.exports = function(migration) {
  const metadata = migration
    .createContentType('metadata')
    .name('Metadata')
    .description(
      'Metadata for a campaign or page to help with SEO and sharing on social platforms.',
    )
    .displayField('internalTitle');

  metadata
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  metadata
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(false)
    .localized(true);

  metadata
    .createField('description')
    .name('Description')
    .type('Text')
    .required(false)
    .localized(true);

  metadata
    .createField('image')
    .name('Image')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .localized(false);
};
