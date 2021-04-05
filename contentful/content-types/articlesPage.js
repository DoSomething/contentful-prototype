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
    .createField('headerTitle')
    .name('Header Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  articlesPage
    .createField('headerArticle')
    .name('HeaderArticle')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['page'],
        message: 'Only Page entries (articles) are valid for this field.',
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  articlesPage
    .createField('headerLinkText')
    .name('Header Link Text')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  articlesPage
    .createField('featuredArticlesGalleryTopTitle')
    .name('Featured Articles Gallery Top Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  articlesPage
    .createField('featuredArticlesGalleryTop')
    .name('Featured Articles Gallery Top')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          min: 6,
          max: 6,
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
          message: 'Only Page entries are valid in this gallery.',
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
    .createField('featuredArticlesGalleryBottomTitle')
    .name('Featured Articles Gallery Bottom Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  articlesPage
    .createField('featuredArticlesGalleryBottom')
    .name('Featured Articles Gallery Bottom')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 3,
          max: 6,
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
          message: 'Only Page entries are valid in this gallery.',
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

  articlesPage.changeFieldControl('headerTitle', 'builtin', 'singleLine', {
    helpText: 'Add a Title here to showcase the header article content.',
  });

  articlesPage.changeFieldControl(
    'headerArticle',
    'builtin',
    'entryLinkEditor',
    {},
  );

  articlesPage.changeFieldControl('headerLinkText', 'builtin', 'singleLine', {
    helpText: 'Add custom text for the article link ie. "Read More" etc.',
  });

  articlesPage.changeFieldControl(
    'featuredArticlesGalleryTopTitle',
    'builtin',
    'singleLine',
    {},
  );

  articlesPage.changeFieldControl(
    'featuredArticlesGalleryTop',
    'builtin',
    'entryLinksEditor',
    {
      helpText:
        "Add stories you'd like to feature (latest articles, etc) here.",
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
    'featuredArticlesGalleryBottomTitle',
    'builtin',
    'singleLine',
    {},
  );

  articlesPage.changeFieldControl(
    'featuredArticlesGalleryBottom',
    'builtin',
    'entryLinksEditor',
    {
      helpText:
        'Use this gallery to feature 11 facts articles on the articles page.',
      bulkEditing: false,
      showLinkEntityAction: true,
      showCreateEntityAction: true,
    },
  );

  articlesPage.changeFieldControl('ctaTitle', 'builtin', 'singleLine', {});
  articlesPage.changeFieldControl('ctaText', 'builtin', 'singleLine', {});
  articlesPage.changeFieldControl('ctaButtonText', 'builtin', 'singleLine', {});
};
