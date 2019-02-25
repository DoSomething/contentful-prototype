module.exports = function(migration) {
  const petitionSubmissionAction = migration
    .createContentType('petitionSubmissionAction')
    .name('Petition Submission Action')
    .description('Action block for submitting petition reportback posts.')
    .displayField('internalTitle');

  petitionSubmissionAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
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

  petitionSubmissionAction
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
    .createField('textFieldPlaceholder')
    .name('Text Field Placeholder Message')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
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

  petitionSubmissionAction
    .createField('informationTitle')
    .name('Information Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
    .createField('informationContent')
    .name('Information Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
    .createField('affirmationContent')
    .name('Affirmation Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction.changeEditorInterface(
    'internalTitle',
    'singleLine',
    {},
  );

  petitionSubmissionAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue.',
  });

  petitionSubmissionAction.changeEditorInterface('title', 'singleLine', {
    helpText:
      'The title of the petition block (defaults to "Sign The Petition").',
  });

  petitionSubmissionAction.changeEditorInterface('content', 'markdown', {
    helpText: "The petition's content.",
  });

  petitionSubmissionAction.changeEditorInterface(
    'textFieldPlaceholder',
    'singleLine',
    {
      helpText:
        'The placeholder for the "custom message" text field (defaults to "Add your custom message...").',
    },
  );

  petitionSubmissionAction.changeEditorInterface('buttonText', 'singleLine', {
    helpText:
      'Text to display on the submission button (defaults to "Add your name").',
  });

  petitionSubmissionAction.changeEditorInterface(
    'informationTitle',
    'singleLine',
    {
      helpText:
        'Title to display for the information block (defaults to "More Info").',
    },
  );

  petitionSubmissionAction.changeEditorInterface(
    'informationContent',
    'markdown',
    {
      helpText:
        'Content to display for the information block (defaults to basic information regarding what happens with user\'s signature").',
    },
  );

  petitionSubmissionAction.changeEditorInterface(
    'affirmationContent',
    'markdown',
    {
      helpText:
        'Content to display once the user successfully submits their petition reportback (defaults to a generic thank you message).',
    },
  );

  petitionSubmissionAction.changeEditorInterface(
    'additionalContent',
    'objectEditor',
    {},
  );
};
