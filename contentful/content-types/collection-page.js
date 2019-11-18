module.exports = function(migration) {
  const collectionPage = migration
    .createContentType('collectionPage')
    .name('Collection Page')
    .description(
      'A curated collection of content (information, campaigns, articles, reportbacks) related to a central topic or affiliate.',
    )
    .displayField('internalTitle');

  collectionPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  collectionPage
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
          pattern: '^[a-z\\-]+$',
          flags: null,
        },

        message:
          'Only alphanumeric and hyphen characters are allowed in slugs!',
      },
    ])
    .disabled(false)
    .omitted(false);

  collectionPage
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
      {
        assetImageDimensions: {
          width: {
            min: 1440,
            max: null,
          },

          height: {
            min: 610,
            max: null,
          },
        },
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

  collectionPage
    .createField('superTitle')
    .name('Super Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  collectionPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  collectionPage
    .createField('description')
    .name('Description')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {},
      },
      {
        enabledNodeTypes: [
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'hyperlink',
        ],
        message:
          'Only ordered list, unordered list, horizontal rule, quote, and link to Url nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  collectionPage
    .createField('affiliatePrefix')
    .name('Affiliate Prefix')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  collectionPage
    .createField('affiliates')
    .name('Affiliates')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 0,
          max: 1,
        },

        message:
          'We only support adding one affiliate at the moment. Need more? Hop into #team-product on Slack and chat with us!',
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [],
      linkType: 'Entry',
    });

  collectionPage
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {
          'embedded-entry-block': [
            {
              linkContentType: ['contentBlock', 'galleryBlock'],
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
        ],

        message:
          'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, and link to Url nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  collectionPage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  collectionPage.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'e.g. "boosomething-halloween". The URL for the Collection Page will be prefixed with "collections/" e.g. "https://dosomething.org/us/collections/boosomething-halloween".',
  });

  collectionPage.changeFieldControl(
    'coverImage',
    'builtin',
    'assetLinkEditor',
    {
      helpText:
        'The cover image is used as the background for the banner of the Collection Page.',
    },
  );

  collectionPage.changeFieldControl('superTitle', 'builtin', 'singleLine', {
    helpText:
      'Shows up atop the title in the banner (can be used as a nice prefix to the title) e.g. "Let\'s affect a more positive".',
  });

  collectionPage.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'The great big title in the banner e.g. "Halloween"',
  });

  collectionPage.changeFieldControl(
    'description',
    'builtin',
    'richTextEditor',
    {
      helpText:
        'Sits in the banner below the title, provides some general information / introduction to the collection page',
    },
  );

  collectionPage.changeFieldControl(
    'affiliatePrefix',
    'builtin',
    'singleLine',
    {
      helpText:
        '*If* there are affiliates for this Collection Page, add a custom prefix for how they\'re introduced -- this text will display atop the logo at the foot of the banner. E.g. "Sponsored By", defaults to "In Partnership With".',
    },
  );

  collectionPage.changeFieldControl(
    'affiliates',
    'builtin',
    'entryLinksEditor',
    {
      helpText:
        'The affiliate partner or sponsor associated with this Collections Page. Their logo will appear at the foot of the banner, prefixed with the Affiliate Prefix field content.',
      bulkEditing: false,
    },
  );

  collectionPage.changeFieldControl('content', 'builtin', 'richTextEditor', {
    helpText:
      'The core content for this collection page, sits below the banner, optimally a collection of galleries e.g. campaigns & articles related to this topic.',
  });
};
