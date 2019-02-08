module.exports = function(migration) {
  const photoSubmissionAction = migration
    .createContentType('photoSubmissionAction')
    .name('Photo Submission Action')
    .description('Action block for submitting photo reportback posts.')
    .displayField('internalTitle');

  photoSubmissionAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .required(false)
    .localized(false)
    .validations([
      {
        unique: true,
      },
    ]);

  photoSubmissionAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('captionFieldLabel')
    .name('Caption Field Label')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('captionFieldPlaceholder')
    .name('Caption Field Placeholder')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('showQuantityField')
    .name('Show Quantity Field')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('quantityFieldLabel')
    .name('Quantity Field Label')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('quantityFieldPlaceholder')
    .name('Quantity Field Placeholder')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('whyParticipatedFieldLabel')
    .name('Why Participated Field Label')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('whyParticipatedFieldPlaceholder')
    .name('Why Participated Field Placeholder')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('informationTitle')
    .name('Information Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('informationContent')
    .name('Information Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('affirmationContent')
    .name('Affirmation Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      '(Example: "Teens for Jeans 2017 Photo Submission Action") Use the campaign title, year and append "Photo Submission Action".',
  });

  photoSubmissionAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue.',
  });

  photoSubmissionAction.changeEditorInterface('title', 'singleLine', {
    helpText:
      'Title to display for this block (defaults to "Submit your photo").',
  });

  photoSubmissionAction.changeEditorInterface(
    'captionFieldLabel',
    'singleLine',
    {
      helpText:
        'The label for the caption field (defaults to "Add a caption to your photo.").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'captionFieldPlaceholder',
    'singleLine',
    {
      helpText:
        'The placeholder for the caption field (defaults to "60 characters or less").',
    },
  );

  photoSubmissionAction.changeEditorInterface('showQuantityField', 'boolean', {
    helpText:
      "Should the form ask for the quantity of items in member's photo submission?",
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  photoSubmissionAction.changeEditorInterface(
    'quantityFieldLabel',
    'singleLine',
    {
      helpText:
        'The label for the quantity field (default to "How many items are in this photo?").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'quantityFieldPlaceholder',
    'singleLine',
    {
      helpText:
        'The placeholder for the quantity field (defaults to "Quantity # (e.g. 300)").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'whyParticipatedFieldLabel',
    'singleLine',
    {
      helpText:
        'The label for the why participated field (defaults to "Why is this campaign important to you?").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'whyParticipatedFieldPlaceholder',
    'singleLine',
    {
      helpText:
        'The placeholder for the why participated field (defaults to "No need to write an essay, but we\'d love to see why this matters to you!").',
    },
  );

  photoSubmissionAction.changeEditorInterface('buttonText', 'singleLine', {
    helpText:
      'The text to show for the submit button (defaults to "Submit a new photo").',
  });

  photoSubmissionAction.changeEditorInterface(
    'informationTitle',
    'singleLine',
    {
      helpText:
        'Title to display for the information block (defaults to "More Info").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'informationContent',
    'markdown',
    {
      helpText:
        'Content to display for the information block (defaults to "A DoSomething staffer will review and approve your photo.").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'affirmationContent',
    'markdown',
    {
      helpText:
        'The text for the affirmation pop up after successful submission (contains a suitable default).',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'additionalContent',
    'objectEditor',
    {},
  );
};
