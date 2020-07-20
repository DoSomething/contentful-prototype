module.exports = function(migration) {
  const campaignUpdate = migration
    .createContentType('campaignUpdate')
    .name('Campaign Update')
    .description('')
    .displayField('internalTitle');
  campaignUpdate
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaignUpdate
    .createField('displayOptions')
    .name('Display Options')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          max: 1,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Symbol',

      validations: [
        {
          in: ['two-thirds', 'full'],
        },
      ],
    });

  campaignUpdate
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaignUpdate
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

  campaignUpdate
    .createField('author')
    .name('Author')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['person'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  campaignUpdate
    .createField('affiliateLogo')
    .name('Affiliate Logo')
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

  campaignUpdate.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  campaignUpdate.changeFieldControl(
    'displayOptions',
    'builtin',
    'checkbox',
    {},
  );
  campaignUpdate.changeFieldControl('content', 'builtin', 'markdown', {});

  campaignUpdate.changeFieldControl('link', 'builtin', 'urlEditor', {
    helpText:
      'Link content will be inserted after the copy in the content field.',
  });

  campaignUpdate.changeFieldControl('author', 'builtin', 'entryLinkEditor', {});

  campaignUpdate.changeFieldControl(
    'affiliateLogo',
    'builtin',
    'assetLinkEditor',
    {
      helpText:
        "The logo of the partner or sponsor you want to highlight, adding this field will cause this campaign update to be rendered in 'affiliate' mode. More info in the publishing documentation http://bit.ly/campaign-update.",
    },
  );
};
