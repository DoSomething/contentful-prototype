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
    .validations([
      {
        size: {
          min: 7,
          max: 7,
        },

        message: 'Please add exactly seven campaigns',
      },
    ])
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
    .createField('sponsors')
    .name('Sponsors')
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
          linkContentType: ['affiliates'],
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

  homePage.changeFieldControl('coverImage', 'builtin', 'assetLinkEditor', {
    helpText:
      'Cover image to display as background for the top banner on the home page.',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  homePage.changeFieldControl('campaigns', 'builtin', 'entryLinksEditor', {
    helpText:
      'Add campaigns (Campaign, StoryPage, or CollectionPage (https://bit.ly/2HlM3Mk) entries) to showcase on the home page.',
    bulkEditing: false,
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  homePage.changeFieldControl('articles', 'builtin', 'entryLinksEditor', {
    helpText: 'Add articles (Page entries) to showcase on the home page.',
    bulkEditing: false,
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  homePage.changeFieldControl('sponsors', 'builtin', 'entryLinksEditor', {});
  homePage.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );
};
