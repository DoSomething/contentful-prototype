module.exports = function(migration) {
  const currentSchoolBlock = migration
    .createContentType('currentSchoolBlock')
    .name('Current School Block')
    .description(
      "Displays the user's current school, or allows them to select it if not set.",
    )
    .displayField('internalTitle');

  currentSchoolBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('selectSchoolTitle')
    .name('Select School Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('selectSchoolDescription')
    .name('Select School Description')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('currentSchoolTitle')
    .name('Current School Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('currentSchoolDescription')
    .name('Current School Description')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('schoolNotAvailableDescription')
    .name('School Not Available Description')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  currentSchoolBlock.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
    },
  );

  currentSchoolBlock.changeFieldControl('actionId', 'builtin', 'numberEditor', {
    helpText: "If set, displays the current school's aggregate impact",
  });

  currentSchoolBlock.changeFieldControl(
    'selectSchoolTitle',
    'builtin',
    'singleLine',
    {
      helpText: 'Defaults to "Find Your School" if blank',
    },
  );

  currentSchoolBlock.changeFieldControl(
    'selectSchoolDescription',
    'builtin',
    'markdown',
    {},
  );

  currentSchoolBlock.changeFieldControl(
    'currentSchoolTitle',
    'builtin',
    'singleLine',
    {
      helpText: 'Defaults to "Your School" if blank',
    },
  );

  currentSchoolBlock.changeFieldControl(
    'currentSchoolDescription',
    'builtin',
    'markdown',
    {},
  );

  currentSchoolBlock.changeFieldControl(
    'schoolNotAvailableDescription',
    'builtin',
    'markdown',
    {
      helpText:
        'Displayed when user has selected that they cannot find their school',
    },
  );
};
