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
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  homePage
    .createField('blocks')
    .name('Blocks')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['campaign', 'page', 'storyPage'],
        },
      ],

      linkType: 'Entry',
    });

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
          linkContentType: ['campaign', 'storyPage'],
          message: 'Only Campaign and StoryPage entries are valid.',
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
  homePage.changeEditorInterface('internalTitle', 'singleLine', {});
  homePage.changeEditorInterface('title', 'singleLine', {});
  homePage.changeEditorInterface('subTitle', 'singleLine', {});

  homePage.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });

  homePage.changeEditorInterface('campaigns', 'entryLinksEditor', {
    helpText:
      'Add campaigns (Campaign or StoryPage entries) to showcase on the home page.',
    bulkEditing: false,
  });

  homePage.changeEditorInterface('articles', 'entryLinksEditor', {
    helpText: 'Add articles (Page entries) to showcase on the home page.',
    bulkEditing: false,
  });

  homePage.changeEditorInterface('additionalContent', 'objectEditor', {});
};
