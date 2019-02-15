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
    .localized(false)
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
          pattern: '^(?!/)story/[a-zA-Z0-9-/]+$',
          flags: '',
        },

        message:
          'Only alphanumeric, forward-slash, and hyphen characters are allowed in slugs! Entry must begin with "story/".',
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
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([
      {
        nodes: {},
      },
      {
        enabledMarks: ['bold', 'italic', 'underline'],
        message: 'Only bold, italic, and underline marks are allowed',
      },
      {
        enabledNodeTypes: [
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'unordered-list',
          'ordered-list',
          'blockquote',
          'hr',
        ],

        message:
          'Only heading 2, heading 3, heading 4, heading 5, heading 6, unordered list, ordered list, quote, and horizontal rule nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  storyPage.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  storyPage.changeEditorInterface('title', 'singleLine', {});
  storyPage.changeEditorInterface('subTitle', 'singleLine', {});

  storyPage.changeEditorInterface('slug', 'slugEditor', {
    helpText:
      'If it applies, add an appropriate category prefix for the slug, e.g. "articles/", "about/", "facts/", etc.',
  });

  storyPage.changeEditorInterface('metadata', 'entryLinkEditor', {});
  storyPage.changeEditorInterface('content', 'richTextEditor', {});
};
