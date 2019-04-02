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
    .validations([
      {
        regexp: {
          pattern:
            'https:\\/\\/dosomething\\.carto\\.com\\/builder\\/[a-z0-9-]+\\/embed',
          flags: null,
        },

        message:
          'Must be a valid Carto embeddable map URL from the DoSomething space. (https://dosomething.carto.com/dashboard).',
      },
    ])
    .disabled(false)
    .omitted(false);

  embed
    .createField('previewImage')
    .name('Preview Image')
    .type('Link')
    .localized(false)
    .required(true)
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

  embed.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  embed.changeEditorInterface('url', 'singleLine', {
    helpText:
      'The URL for the embed. (Currently only supporting Carto map embed URLs. (https://dosomething.carto.com/dashboard)).',
  });

  embed.changeEditorInterface('previewImage', 'assetLinkEditor', {
    helpText:
      'Preview image for the embed content. Replaces the embed on smaller screens.',
  });
};
