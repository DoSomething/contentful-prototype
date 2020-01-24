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
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([
      {
        nodes: {
          'entry-hyperlink': [
            {
              linkContentType: ['contentBlock', 'imagesBlock', 'linkAction'],
            },
          ],
        },
      },
    ])
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
          linkContentType: ['callToAction', 'contentBlock', 'customBlock'],
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
    .disabled(true)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['callToAction', 'contentBlock', 'customBlock'],
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
  landingPage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  landingPage.changeFieldControl('content', 'builtin', 'richTextEditor', {});

  landingPage.changeFieldControl('sidebar', 'builtin', 'entryLinksEditor', {
    helpText: 'Deprecated -- only displayed on legacy template',
    bulkEditing: false,
  });

  landingPage.changeFieldControl('blocks', 'builtin', 'entryLinksEditor', {});
  landingPage.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );
};
