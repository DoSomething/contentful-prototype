module.exports = function(migration) {
  const articlesPage = migration
    .createContentType('articlesPage')
    .name('Articles Page')
    .description('The page for us to showcase articles on DoSomething.org')
    .displayField('internalTitle');
  articlesPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  articlesPage
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
          min: null,
          max: 20971520,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  articlesPage
    .createField('latestArticlesGalleryTitle')
    .name('Latest Articles Gallery Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  articlesPage
    .createField('latestArticlesGallery')
    .name('Latest Articles Gallery')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          min: 7,
          max: 7,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['page'],
          message: 'Only Page entries are valid.',
        },
      ],

      linkType: 'Entry',
    });

  articlesPage
    .createField('topicArticlesGalleryOneTitle')
    .name('Topic Articles Gallery One Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  articlesPage
    .createField('topicArticlesGalleryOne')
    .name('Topic Articles Gallery One')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 3,
          max: 6,
        },

        message: 'Please add 3 or 6 articles to this gallery.',
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['page'],
          message: 'Only Page entries are valid.',
        },
      ],

      linkType: 'Entry',
    });

  articlesPage
    .createField('topicArticlesGalleryTwoTitle')
    .name('Topic Articles Gallery Two Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  articlesPage
    .createField('topicArticlesGalleryTwo')
    .name('Topic Articles Gallery Two')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 3,
          max: 6,
        },

        message: 'Please add 3 or 6 articles to this gallery.',
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['page'],
          message: 'Only Page entries are valid.',
        },
      ],

      linkType: 'Entry',
    });

  articlesPage
    .createField('elevenFactsGalleryTitle')
    .name('Eleven Facts Gallery Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  articlesPage
    .createField('elevenFactsGallery')
    .name('Eleven Facts Gallery')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 3,
          max: 6,
        },

        message: 'Please add 3 or 6 articles to this gallery.',
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['page'],
          message: 'Only Page entries are valid.',
        },
      ],

      linkType: 'Entry',
    });

  articlesPage
    .createField('ctaTitle')
    .name('CTA Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  articlesPage
    .createField('ctaText')
    .name('CTA Text')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  articlesPage
    .createField('ctaButtonText')
    .name('CTA Button Text')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  articlesPage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});

  articlesPage.changeFieldControl('coverImage', 'builtin', 'assetLinkEditor', {
    helpText:
      'Cover image to display as background for the top banner on the articles page.',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  articlesPage.changeFieldControl(
    'latestArticlesGalleryTitle',
    'builtin',
    'singleLine',
    {
      helpText: 'Add the title for our latest articles gallery',
    },
  );

  articlesPage.changeFieldControl(
    'latestArticlesGallery',
    'builtin',
    'entryLinksEditor',
    {
      helpText: 'Add articles (Page entries) to showcase on the articles page.',
      bulkEditing: false,
      showLinkEntityAction: true,
      showCreateEntityAction: true,
    },
  );

  articlesPage.changeFieldControl(
    'topicArticlesGalleryOneTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'Add a title for first gallery of articles on a featured topic.',
    },
  );

  articlesPage.changeFieldControl(
    'topicArticlesGalleryOne',
    'builtin',
    'entryLinksEditor',
    {
      helpText:
        'Add articles about the same topic to showcase on the articles page.',
      bulkEditing: false,
      showLinkEntityAction: true,
      showCreateEntityAction: true,
    },
  );

  articlesPage.changeFieldControl(
    'topicArticlesGalleryTwoTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'Add a title for the second gallery of articles on a specific topic.',
    },
  );

  articlesPage.changeFieldControl(
    'topicArticlesGalleryTwo',
    'builtin',
    'entryLinksEditor',
    {
      helpText:
        'Add articles on the same topic to showcase on the articles page.',
      bulkEditing: false,
      showLinkEntityAction: true,
      showCreateEntityAction: true,
    },
  );

  articlesPage.changeFieldControl(
    'elevenFactsGalleryTitle',
    'builtin',
    'singleLine',
    {},
  );

  articlesPage.changeFieldControl(
    'elevenFactsGallery',
    'builtin',
    'entryLinksEditor',
    {
      helpText: 'Add 11 facts articles to feature on the articles page.',
      bulkEditing: false,
      showLinkEntityAction: true,
      showCreateEntityAction: true,
    },
  );

  articlesPage.changeFieldControl('ctaTitle', 'builtin', 'singleLine', {});
  articlesPage.changeFieldControl('ctaText', 'builtin', 'singleLine', {});
  articlesPage.changeFieldControl('ctaButtonText', 'builtin', 'singleLine', {});
};
