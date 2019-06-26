module.exports = function(migration) {
  const landingPage = migration
    .createContentType('landingPage')
    .name('Landing Page')
    .description('A custom landing page for a DoSomething.org campaign.')
    .displayField('internalTitle');
  landingPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  landingPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  landingPage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  landingPage
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  landingPage
    .createField('sidebar')
    .name('Sidebar')
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
          linkContentType: ['campaignUpdate', 'customBlock', 'cardBlock'],
        },
      ],

      linkType: 'Entry',
    });

  landingPage
    .createField('blocks')
    .name('Blocks')
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
          linkContentType: [
            'callToAction',
            'contentBlock',
            'customBlock',
            'galleryBlock',
          ],
        },
      ],

      linkType: 'Entry',
    });

  landingPage
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  landingPage.changeEditorInterface('internalTitle', 'singleLine', {});
  landingPage.changeEditorInterface('title', 'singleLine', {});
  landingPage.changeEditorInterface('subTitle', 'singleLine', {});
  landingPage.changeEditorInterface('content', 'markdown', {});

  landingPage.changeEditorInterface('sidebar', 'entryLinksEditor', {
    bulkEditing: false,
  });

  landingPage.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });

  landingPage.changeEditorInterface('additionalContent', 'objectEditor', {});
};
