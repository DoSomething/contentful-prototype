module.exports = function(migration) {
  const sectionBlock = migration
    .createContentType('sectionBlock')
    .name('Section Block')
    .description('Block used to showcase a section of art-directed content.')
    .displayField('internalTitle');
  sectionBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  sectionBlock
    .createField('backgroundColor')
    .name('Background Color')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^#[0-9a-f]{6}$',
          flags: 'i',
        },

        message:
          'Hexadecimal value, must start with a "#" and follow it with 6 characters.',
      },
    ])
    .disabled(false)
    .omitted(false);

  sectionBlock
    .createField('textColor')
    .name('Text Color')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^#[0-9a-f]{6}$',
          flags: 'i',
        },

        message:
          'Hexadecimal value, must start with a "#" and follow it with 6 characters.',
      },
    ])
    .disabled(false)
    .omitted(false);

  sectionBlock
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([
      {
        enabledMarks: ['bold', 'italic', 'underline'],
        message: 'Only bold, italic, and underline marks are allowed',
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
          'blockquote',
          'embedded-entry-block',
          'hyperlink',
          'embedded-asset-block',
        ],

        message:
          'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, quote, block entry, link to Url, and asset nodes are allowed',
      },
      {
        nodes: {
          'embedded-entry-block': [
            {
              linkContentType: [
                'callToAction',
                'campaignUpdate',
                'clubBlock',
                'contentBlock',
                'embed',
                'imagesBlock',
                'linkAction',
                'petitionSubmissionAction',
                'photoSubmissionAction',
                'postGallery',
                'shareAction',
                'socialDriveAction',
                'textSubmissionAction',
                'voterRegistrationAction',
              ],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  sectionBlock.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  sectionBlock.changeFieldControl(
    'backgroundColor',
    'builtin',
    'singleLine',
    {},
  );
  sectionBlock.changeFieldControl('textColor', 'builtin', 'singleLine', {});
  sectionBlock.changeFieldControl('content', 'builtin', 'richTextEditor', {});
};
