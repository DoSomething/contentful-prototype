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

  landingPage.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {
      helpText: 'Only used for legacy template',
    },
  );
};
