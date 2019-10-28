module.exports = function(migration) {
  const causePage = migration
    .createContentType('causePage')
    .name('Cause Page')
    .description(
      'A collection of content (information, campaigns, articles, reportbacks) revolving around a particular cause space',
    )
    .displayField('internalTitle');

  causePage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  causePage
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
          pattern: '^[a-z\\-]+$',
          flags: null,
        },

        message:
          'Slug should match the cause type e.g. "environment". Only alphanumeric and hyphen characters are allowed in slugs! The URL for the Cause Page will be prefixed with "causes/" e.g. "https://dosomething.org/us/causes/environment".',
      },
    ])
    .disabled(false)
    .omitted(false);

  causePage
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .localized(false)
    .required(true)
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

  causePage
    .createField('superTitle')
    .name('Super Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  causePage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  causePage
    .createField('description')
    .name('Description')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {},
      },
      {
        enabledNodeTypes: [
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
        ],

        message:
          'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, and quote nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  causePage
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {
          'embedded-entry-block': [
            {
              linkContentType: ['galleryBlock'],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  causePage.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  causePage.changeEditorInterface('slug', 'slugEditor', {
    helpText:
      'Must begin with the "causes/" category prefix for the slug, e.g. "causes/environment".',
  });

  causePage.changeEditorInterface('coverImage', 'assetLinkEditor', {
    helpText:
      'The cover image is used as the background for the banner of the Cause Page.',
  });

  causePage.changeEditorInterface('superTitle', 'singleLine', {
    helpText:
      'Shows up atop the title in the banner (can be used as a nice prefix to the title) e.g. "Let\'s do something about the".',
  });

  causePage.changeEditorInterface('title', 'singleLine', {
    helpText: 'The great big title in the banner e.g. "Environment"',
  });

  causePage.changeEditorInterface('description', 'richTextEditor', {
    helpText:
      'Sits in the banner below the title, provides some general information / introduction to the cause space',
  });

  causePage.changeEditorInterface('content', 'richTextEditor', {
    helpText:
      'The core content for this cause page, sits below the banner, optimally a collection of galleries e.g. campaigns & articles related to this cause space',
  });
};
