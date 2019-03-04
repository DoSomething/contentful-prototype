module.exports = function(migration) {
  const textSubmissionAction = migration
    .createContentType('textSubmissionAction')
    .name('Text Submission Action')
    .description('Action block for submitting text reportback posts.')
    .displayField('internalTitle');

  textSubmissionAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  textSubmissionAction
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .required(true)
    .localized(false)
    .validations([
      {
        unique: true,
      },
    ]);

  textSubmissionAction
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

  textSubmissionAction
    .createField('textFieldLabel')
    .name('Text Field Label')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  textSubmissionAction
    .createField('textFieldPlaceholder')
    .name('Text Field Placeholder Message')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  textSubmissionAction
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

  textSubmissionAction
    .createField('affirmationContent')
    .name('Affirmation Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  textSubmissionAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  textSubmissionAction.changeEditorInterface('internalTitle', 'singleLine', {});

  textSubmissionAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue.',
  });

  textSubmissionAction.changeEditorInterface('title', 'singleLine', {});

  textSubmissionAction.changeEditorInterface('textFieldLabel', 'singleLine', {
    helpText:
      'The label for the "text" field, helping describe or prompt the user regarding what to submit.',
  });

  textSubmissionAction.changeEditorInterface(
    'textFieldPlaceholder',
    'singleLine',
    {
      helpText:
        'The placeholder for the "text" field, providing an example of what a text submission should look like.',
    },
  );

  textSubmissionAction.changeEditorInterface('buttonText', 'singleLine', {});

  textSubmissionAction.changeEditorInterface(
    'affirmationContent',
    'markdown',
    {},
  );

  textSubmissionAction.changeEditorInterface(
    'additionalContent',
    'objectEditor',
    {},
  );
};
