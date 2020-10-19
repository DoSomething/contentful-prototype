module.exports = function(migration) {
  const voterRegistrationDriveAction = migration
    .createContentType('voterRegistrationDriveAction')
    .name('Voter Registration Drive Action')
    .description('A Social Drive Action for voter registration drives.')
    .displayField('internalTitle');

  voterRegistrationDriveAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  voterRegistrationDriveAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  voterRegistrationDriveAction
    .createField('description')
    .name('Description')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  voterRegistrationDriveAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );
  voterRegistrationDriveAction.changeFieldControl(
    'title',
    'builtin',
    'singleLine',
    {},
  );
  voterRegistrationDriveAction.changeFieldControl(
    'description',
    'builtin',
    'markdown',
    {},
  );
};
