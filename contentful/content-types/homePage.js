module.exports = function(migration) {
  const homePage = migration
    .createContentType('homePage')
    .name('Home Page')
    .description('The Home Page for DoSomething.org.')
    .displayField('internalTitle');
  homePage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  homePage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  homePage
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

  homePage
    .createField('campaigns')
    .name('Campaigns')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['campaign', 'collectionPage', 'storyPage'],
          message:
            'Only Campaign, StoryPage, and CollectionPage entries are valid.',
        },
      ],

      linkType: 'Entry',
    });

  homePage
    .createField('articles')
    .name('Articles')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['page'],
        },
      ],

      linkType: 'Entry',
    });

  homePage
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  homePage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  homePage.changeFieldControl('title', 'builtin', 'singleLine', {});
  homePage.changeFieldControl('coverImage', 'builtin', 'assetLinkEditor', {});

  homePage.changeFieldControl('campaigns', 'builtin', 'entryLinksEditor', {
    helpText:
      'Add campaigns (Campaign or StoryPage entries) to showcase on the home page.',
    bulkEditing: false,
  });

  homePage.changeFieldControl('articles', 'builtin', 'entryLinksEditor', {
    helpText: 'Add articles (Page entries) to showcase on the home page.',
    bulkEditing: false,
  });

  homePage.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );
};
