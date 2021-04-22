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
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

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
  photoSubmissionAction
    .createField('numberOfParticipantsFieldLabel')
    .name('Number Of Participants Field Label')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        '(Example: "Teens for Jeans 2017 Photo Submission Action") Use the campaign title, year and append "Photo Submission Action".',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'actionId',
    'builtin',
    'numberEditor',
    {
      helpText: 'The Action ID associated with this action in Rogue',
    },
  );

  photoSubmissionAction.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText:
      'Title to display for this block (defaults to "Submit your photo").',
  });

  photoSubmissionAction.changeFieldControl(
    'showQuantityField',
    'builtin',
    'boolean',
    {
      helpText:
        "Should the form ask for the quantity of items in member's photo submission?",
      trueLabel: 'Yes',
      falseLabel: 'No',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'quantityFieldLabel',
    'builtin',
    'singleLine',
    {
      helpText:
        'The label for the quantity field (default to "How many items are in this photo?").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'quantityFieldPlaceholder',
    'builtin',
    'singleLine',
    {
      helpText:
        'The placeholder for the quantity field (defaults to "Use numbers (e.g. 1)").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'whyParticipatedFieldLabel',
    'builtin',
    'singleLine',
    {
      helpText:
        'The label for the why participated field (defaults to "Why is this campaign important to you?").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'whyParticipatedFieldPlaceholder',
    'builtin',
    'singleLine',
    {
      helpText:
        'The placeholder for the why participated field (defaults to "No need to write an essay, but we\'d love to see why this matters to you!").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'buttonText',
    'builtin',
    'singleLine',
    {
      helpText:
        'The text to show for the submit button (defaults to "Submit a new photo").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'informationTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'Title to display for the information block (defaults to "More Info").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'informationContent',
    'builtin',
    'markdown',
    {
      helpText:
        'Content to display for the information block (defaults to "A DoSomething staffer will review and approve your photo.").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'affirmationContent',
    'builtin',
    'markdown',
    {
      helpText:
        'The text for the affirmation pop up after successful submission (contains a suitable default).',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );

  photoSubmissionAction.changeFieldControl(
    'numberOfParticipantsFieldLabel',
    'builtin',
    'singleLine',
    {
      helpText:
        'This question will ONLY show up if the label is filled out. ONLY use this field to ask members about how many people they did this campaign with. We recommend starting with "including yourself" so that users don\'t feel bad if they did it alone.',
    },
  );
};
