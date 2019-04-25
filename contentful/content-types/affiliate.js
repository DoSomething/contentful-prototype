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

  affiliates.changeEditorInterface('title', 'singleLine', {});
  affiliates.changeEditorInterface('link', 'urlEditor', {});
  affiliates.changeEditorInterface('logo', 'assetLinkEditor', {});
};
