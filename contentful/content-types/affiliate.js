module.exports = function(migration) {
  const affiliates = migration
    // Sigh at this very OG content type using a pluralized id :)
    .createContentType('affiliates')
    .name('Affiliates')
    .description(
      'Sponsors, partners, or other third-party affiliates for a campaign.',
    )
    .displayField('internalTitle');

  affiliates
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  affiliates
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  affiliates
    .createField('link')
    .name('Link')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern:
            '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$',
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  affiliates
    .createField('logo')
    .name('Logo')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  affiliates
    .createField('utmLabel')
    .name('UTM Label')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        unique: true,
      },
      {
        size: {
          max: 50,
        },

        message: 'The UTM Label field may not exceed 50 characters.',
      },
      {
        regexp: {
          pattern: '^[a-z0-9_]*$',
          flags: null,
        },

        message:
          'The UTM Label field can only contain lower case, alphanumeric characters and must be snake cased (http://bit.ly/2Pxkxv9).',
      },
    ])
    .disabled(false)
    .omitted(false);

  affiliates.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  affiliates.changeEditorInterface('title', 'singleLine', {});
  affiliates.changeEditorInterface('link', 'urlEditor', {});
  affiliates.changeEditorInterface('logo', 'assetLinkEditor', {});

  affiliates.changeEditorInterface('utmLabel', 'singleLine', {
    helpText:
      'The UTM parameter label identifying this affiliate. (Primarily used to identify referring scholarship affiliate partners).',
  });
};
