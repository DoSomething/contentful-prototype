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
    .required(true)
    .localized(false);

  landingPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .localized(true);

  landingPage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .required(false)
    .localized(true);

  landingPage
    .createField('content')
    .name('Content')
    .type('Text')
    .required(false)
    .localized(true);

  landingPage
    .createField('sidebar')
    .name('Sidebar')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [
        {
          linkContentType: ['callToAction', 'customBlock'],
        },
      ],
    })
    .required(false)
    .localized(false);

  landingPage
    .createField('blocks')
    .name('Blocks')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [
        {
          linkContentType: ['callToAction', 'contentBlock', 'customBlock'],
        },
      ],
    })
    .required(false)
    .localized(false);

  landingPage
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .required(false)
    .localized(false);
};
