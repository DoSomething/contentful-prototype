module.exports = function(migration) {
  const selectionSubmissionAction = migration
    .createContentType('selectionSubmissionAction')
    .name('SelectionSubmissionAction')
    .description(
      'Action block for submitting text posts via a predefined selection drop-down list.',
    )
    .displayField('internalTitle');

  selectionSubmissionAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 65,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {},
      },
      {
        enabledNodeTypes: [
          'blockquote',
          'unordered-list',
          'ordered-list',
          'hyperlink',
          'hr',
          'heading-6',
          'heading-5',
          'heading-4',
          'heading-3',
        ],

        message:
          'Only quote, unordered list, ordered list, link to Url, horizontal rule, heading 6, heading 5, heading 4, and heading 3 nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('selectionFieldLabel')
    .name('Selection Field Label')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('selectionOptions')
    .name('Selection Options')
    .type('Array')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Symbol',
      validations: [],
    });

  selectionSubmissionAction
    .createField('selectionPlaceholderOption')
    .name('Selection Placeholder Option')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 25,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('postSubmissionLabel')
    .name('Post Submission Label')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction.changeEditorInterface(
    'internalTitle',
    'singleLine',
    {
      helpText: 'This title is used internally to help find this content.',
    },
  );

  selectionSubmissionAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText:
      'The Action ID associated with this action. Action IDs can be found in Rogue: https://dosome.click/nyshrf',
  });

  selectionSubmissionAction.changeEditorInterface('title', 'singleLine', {
    helpText:
      'The title for the selection block. (Defaults to "Make a selection").',
  });

  selectionSubmissionAction.changeEditorInterface('content', 'richTextEditor', {
    helpText: 'The content displayed in the submission block.',
  });

  selectionSubmissionAction.changeEditorInterface(
    'selectionFieldLabel',
    'singleLine',
    {
      helpText:
        'The label displayed above the selection field. (Defaults to "Select one of the options below").',
    },
  );

  selectionSubmissionAction.changeEditorInterface(
    'selectionOptions',
    'listInput',
    {
      helpText:
        'The selection options for the selection block. Insert comma separated values.',
    },
  );

  selectionSubmissionAction.changeEditorInterface(
    'selectionPlaceholderOption',
    'singleLine',
    {
      helpText:
        'The placeholder selection value. This will not be a valid selection. (Defaults to "---").',
    },
  );

  selectionSubmissionAction.changeEditorInterface('buttonText', 'singleLine', {
    helpText:
      'Text to display on the submission button (defaults to "Submit").',
  });

  selectionSubmissionAction.changeEditorInterface(
    'postSubmissionLabel',
    'singleLine',
    {
      helpText: 'The text displayed under the user selection, post submission.',
    },
  );
};
