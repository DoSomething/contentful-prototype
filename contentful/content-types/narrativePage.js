module.exports = function(migration) {
  const narrativePage = migration
    .createContentType('narrativePage')
    .name('NarrativePage')
    .description(
      'Narrative pages are used for helping craft a story or experience on a single web page.',
    )
    .displayField('internalTitle');

  narrativePage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  narrativePage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  narrativePage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  narrativePage
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
          pattern: '(?!/)[a-zA-Z0-9-/]+$',
          flags: '',
        },

        message:
          'Only alphanumeric, forward-slash, and hyphen characters are allowed in slugs! Entry cannot start with a forward-slash.',
      },
    ])
    .disabled(false)
    .omitted(false);

  narrativePage
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

  narrativePage
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

  narrativePage.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  narrativePage.changeEditorInterface('title', 'singleLine', {});
  narrativePage.changeEditorInterface('subTitle', 'singleLine', {});

  narrativePage.changeEditorInterface('slug', 'slugEditor', {
    helpText:
      'If it applies, add an appropriate category prefix for the slug, e.g. "articles/", "about/", "facts/", etc.',
  });

  narrativePage.changeEditorInterface('metadata', 'entryLinkEditor', {});
  narrativePage.changeEditorInterface('content', 'richTextEditor', {});
};
