module.exports = function(migration) {
  const externalLink = migration
    .createContentType('externalLink')
    .name('External Link')
    .description(
      'An clickable card showcasing an external link with a customizable provider image, title, and description.',
    )
    .displayField('internalTitle');

  externalLink
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  externalLink
    .createField('url')
    .name('URL')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        regexp: {
          pattern:
            '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
          flags: null,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  externalLink
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  externalLink
    .createField('description')
    .name('Description')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  externalLink
    .createField('image')
    .name('Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        assetFileSize: {
          min: null,
          max: 20971520,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  externalLink.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  externalLink.changeFieldControl('url', 'builtin', 'singleLine', {});

  externalLink.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Optionally override the URL provider title.',
  });

  externalLink.changeFieldControl('description', 'builtin', 'singleLine', {
    helpText: 'Optionally override the URL provider description',
  });

  externalLink.changeFieldControl('image', 'builtin', 'assetLinkEditor', {
    helpText: 'Optionally override the URL provider image.',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });
};
