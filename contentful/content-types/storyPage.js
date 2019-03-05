module.exports = function(migration) {
  const storyPage = migration
    .createContentType('storyPage')
    .name('StoryPage')
    .description(
      'Story pages are used for helping craft a story or experience on a single web page.',
    )
    .displayField('internalTitle');

  storyPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  storyPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  storyPage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  storyPage
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
          pattern: '^(?!\\/)stories\\/[a-zA-Z0-9-/]+$',
          flags: '',
        },

        message:
          'Only alphanumeric, forward-slash, and hyphen characters are allowed in slugs! Entry must begin with "stories/".',
      },
    ])
    .disabled(false)
    .omitted(false);

  storyPage
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

  storyPage
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
        assetImageDimensions: {
          width: {
            min: 1440,
            max: null,
          },

          height: {
            min: 610,
            max: null,
          },
        },

        message:
          'The provided image needs to be at least 1440px wide by 610px tall.',
      },
      {
        assetFileSize: {
          max: 20971520,
        },

        message: 'Cover images cannot be more than 20 megabytes.',
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  storyPage
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
          linkContentType: ['sectionBlock'],
        },
      ],

      linkType: 'Entry',
    });

  storyPage.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  storyPage.changeEditorInterface('title', 'singleLine', {});
  storyPage.changeEditorInterface('subTitle', 'singleLine', {});

  storyPage.changeEditorInterface('slug', 'slugEditor', {
    helpText:
      'Must begin with the "stories/" category prefix for the slug, e.g. "stories/page-name-here".',
  });

  storyPage.changeEditorInterface('metadata', 'entryLinkEditor', {});

  storyPage.changeEditorInterface('coverImage', 'assetLinkEditor', {
    helpText:
      'This cover image is used in the banner at the top of the Story Page, as well as for the tile on home page and explore campaigns.',
  });

  storyPage.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });
};
