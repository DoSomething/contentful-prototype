module.exports = function(migration) {
  const page = migration
    .createContentType('page')
    .name('Page')
    .description(
      'A custom page, for example a campaign FAQ or scholarship rules, or a standalone article or 11-facts page.',
    )
    .displayField('internalTitle');

  page
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
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
          flags: null,
        },

        message:
          'Only alphanumeric, forward-slash, and hyphen characters are allowed in slugs!',
      },
    ])
    .disabled(false)
    .omitted(false);

  page
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

  page
    .createField('authors')
    .name('Authors')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 2,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['person'],
        },
      ],

      linkType: 'Entry',
    });

  page
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  page
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
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
          linkContentType: ['callToAction', 'customBlock'],
        },
      ],

      linkType: 'Entry',
    });

  page
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
            'campaignUpdate',
            'contentBlock',
            'customBlock',
            'galleryBlock',
            'imagesBlock',
            'linkAction',
            'petitionSubmissionAction',
            'photoSubmissionAction',
            'postGallery',
            'quiz',
            'referralSubmissionAction',
            'shareAction',
            'sixpackExperiment',
            'selectionSubmissionAction',
            'socialDriveAction',
            'softEdgeWidgetAction',
            'textSubmissionAction',
            'voterRegistrationAction',
          ],
        },
      ],

      linkType: 'Entry',
    });

  page
    .createField('displaySocialShare')
    .name('Display Social Share')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  page
    .createField('hideFromNavigation')
    .name('Hide From Navigation')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField('socialOverride')
    .name('Social Override')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['socialOverride'],
      },
    ])
    .disabled(true)
    .omitted(false)
    .linkType('Entry');

  page
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  page.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  page.changeEditorInterface('title', 'singleLine', {});
  page.changeEditorInterface('subTitle', 'singleLine', {});

  page.changeEditorInterface('slug', 'slugEditor', {
    helpText:
      'For an article page prefix with "articles/", a fact page prefix with "facts/" and for an about page prefix with "about/"',
  });

  page.changeEditorInterface('metadata', 'entryLinkEditor', {});

  page.changeEditorInterface('authors', 'entryLinksEditor', {
    bulkEditing: false,
  });

  page.changeEditorInterface('coverImage', 'assetLinkEditor', {
    helpText: 'The cover image will display on the page before the content.',
  });

  page.changeEditorInterface('content', 'markdown', {});

  page.changeEditorInterface('sidebar', 'entryLinksEditor', {
    helpText: 'Add blocks to show up on alongside the main content.',
    bulkEditing: false,
  });

  page.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });

  page.changeEditorInterface('displaySocialShare', 'boolean', {
    helpText:
      "Select 'Yes' to display Social Sharing buttons on the bottom of the page. (Facebook & Twitter).",
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  page.changeEditorInterface('hideFromNavigation', 'boolean', {
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  page.changeEditorInterface('socialOverride', 'entryLinkEditor', {});
  page.changeEditorInterface('additionalContent', 'objectEditor', {});
};
