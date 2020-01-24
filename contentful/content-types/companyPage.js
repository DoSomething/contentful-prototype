module.exports = function(migration) {
  const companyPage = migration
    .createContentType('companyPage')
    .name('Company Page')
    .description(
      'A custom page for DoSomething static pages with company information.',
    )
    .displayField('internalTitle');
  companyPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  companyPage
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        size: {
          max: 100,
        },
      },
      {
        regexp: {
          pattern: '^[a-z0-9\\-]+$',
        },

        message:
          'Only alphanumeric and hyphen characters are allowed in slugs!',
      },
    ])
    .disabled(false)
    .omitted(false);

  companyPage
    .createField('metadata')
    .name('Metadata')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['metadata'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  companyPage
    .createField('coverImage')
    .name('Cover Image')
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

  companyPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  companyPage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  companyPage
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(true)
    .validations([
      {
        nodes: {
          'embedded-entry-block': [
            {
              linkContentType: [
                'contentBlock',
                'galleryBlock',
                'imagesBlock',
                'linkAction',
              ],
            },
          ],
        },
      },
      {
        enabledNodeTypes: [
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'embedded-entry-block',
          'embedded-asset-block',
          'hyperlink',
          'asset-hyperlink',
        ],

        message:
          'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, link to Url, and link to asset nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  companyPage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});

  companyPage.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'e.g. "our-team". The URL for the Company Page will be prefixed with "about/" e.g. "https://dosomething.org/us/about/our-team".',
  });

  companyPage.changeFieldControl('metadata', 'builtin', 'entryLinkEditor', {});
  companyPage.changeFieldControl(
    'coverImage',
    'builtin',
    'assetLinkEditor',
    {},
  );
  companyPage.changeFieldControl('title', 'builtin', 'singleLine', {});
  companyPage.changeFieldControl('subTitle', 'builtin', 'singleLine', {});
  companyPage.changeFieldControl('content', 'builtin', 'richTextEditor', {});
};
