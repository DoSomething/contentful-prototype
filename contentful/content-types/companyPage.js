module.exports = function(migration) {
  const companyPage = migration
    .createContentType('companyPage')
    .name('CompanyPage')
    .description(
      'A custom page for DoSomething static pages with company information.',
    )
    .displayField('internalTitle');
  companyPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  companyPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  companyPage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  companyPage
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        size: {
          max: 100,
        },
      },
      {
        regexp: {
          pattern: '^[a-zA-Z0-9-/]+$',
        },

        message:
          'Only alphanumeric, forward-slash, and hyphen characters are allowed in slugs!',
      },
    ])
    .disabled(false)
    .omitted(false);

  companyPage
    .createField('metadata')
    .name('Metadata')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['metadata'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  companyPage
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([
      {
        nodes: {
          'embedded-entry-inline': [
            {
              linkContentType: ['galleryBlock', 'imagesBlock', 'linkAction'],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  // @TODO: remove linkAction from accepted types.
  companyPage
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
          linkContentType: ['galleryBlock', 'imagesBlock', 'linkAction'],
        },
      ],

      linkType: 'Entry',
    });

  companyPage.changeEditorInterface('internalTitle', 'singleLine', {});
  companyPage.changeEditorInterface('title', 'singleLine', {});
  companyPage.changeEditorInterface('subTitle', 'singleLine', {});

  companyPage.changeEditorInterface('slug', 'slugEditor', {
    helpText: 'For an about page prefix with "about/", etc.',
  });

  companyPage.changeEditorInterface('metadata', 'entryLinkEditor', {});
  companyPage.changeEditorInterface('content', 'richTextEditor', {});

  companyPage.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });
};
