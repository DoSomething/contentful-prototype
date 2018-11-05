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
    .required(true)
    .localized(false);

  homePage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .localized(true);

  homePage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .required(true)
    .localized(true);

  homePage
    .createField('blocks')
    .name('Blocks')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [
        {
          linkContentType: ['campaign', 'page'],
        },
      ],
    })
    .required(true)
    .localized(false);

  homePage
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .required(false)
    .localized(false);
};
