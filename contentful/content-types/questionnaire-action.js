module.exports = function(migration) {
  const questionnaireAction = migration
    .createContentType('questionnaireAction')
    .name('Questionnaire Action')
    .description(
      'A multi-question submission form. Create a custom range of questions which will appear in a single questionnaire card. Submission will create a separate post per question. Each question should be associated with a unique Action ID in Rogue.',
    )
    .displayField('internalTitle');

  questionnaireAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  questionnaireAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
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

  questionnaireAction
    .createField('questions')
    .name('Questions')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  questionnaireAction
    .createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .localized(false)
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

  questionnaireAction
    .createField('informationTitle')
    .name('Information Title')
    .type('Symbol')
    .localized(false)
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

  questionnaireAction
    .createField('informationContent')
    .name('Information Content')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  questionnaireAction
    .createField('affirmationContent')
    .name('Affirmation Content')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  questionnaireAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
    },
  );

  questionnaireAction.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText:
      'The Questionnaire title. This will appear at the top of the card. Defaults to "Questionnaire".',
  });

  questionnaireAction.changeFieldControl(
    'questions',
    'app',
    '3ays4DQCxsEfKdGs6YqUpB',
    {},
  );

  questionnaireAction.changeFieldControl(
    'buttonText',
    'builtin',
    'singleLine',
    {
      helpText:
        'The text appearing in the form submission button. Defaults to "Submit Answers".',
    },
  );

  questionnaireAction.changeFieldControl(
    'informationTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'Title displayed atop the information card adjacent to the form. Defaults to "More Info".',
    },
  );

  questionnaireAction.changeFieldControl(
    'informationContent',
    'builtin',
    'markdown',
    {
      helpText:
        'Content displayed in the information card adjacent to the form. The card will be hidden unless this field is populated.',
    },
  );

  questionnaireAction.changeFieldControl(
    'affirmationContent',
    'builtin',
    'markdown',
    {
      helpText:
        "The content displayed in the Show Submission page where the user is redirected once they've successfully submitted the form.",
    },
  );
};
