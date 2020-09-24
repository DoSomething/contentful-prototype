module.exports = function(migration) {
  const embed = migration
    .createContentType('embed')
    .name('Embed')
    .description('Embed content from a URL onto a page.')
    .displayField('internalTitle');
  embed
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  embed
    .createField('url')
    .name('URL')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  embed
    .createField('previewImage')
    .name('Preview Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
      {
        assetFileSize: {
          max: 20971520,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  embed.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  embed.changeFieldControl('url', 'builtin', 'singleLine', {
    helpText:
      'The URL for the embed. Supports Carto map (https://dosomething.carto.com/dashboard) or Typeform (https://dosomething.typeform.com) embed URLs from our DoSomething spaces, or Airtable embed URLs (https://airtable.com/embed/abcd1234).',
  });

  embed.changeFieldControl('previewImage', 'builtin', 'assetLinkEditor', {
    helpText:
      'If set, replaces the embed on smaller screens as a preview of the embed content.',
  });
};
