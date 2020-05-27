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
    .createField('approvedPostCountActionId')
    .name('Approved Post Count Action ID')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([
      {
        range: {
          min: 1,
          max: null,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  voterRegistrationDriveAction
    .createField('approvedPostCountLabel')
    .name('Approved Post Count Label')
    .type('Symbol')
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
    'approvedPostCountActionId',
    'builtin',
    'numberEditor',
    {
      helpText:
        "If set, the count of current user's approved posts for this action will appear in the sidebar.",
    },
  );

  voterRegistrationDriveAction.changeFieldControl(
    'approvedPostCountLabel',
    'builtin',
    'singleLine',
    {
      helpText:
        'Label text for the approved post count action, if set. Defaults to "Total scholarship entries" if blank.',
    },
  );
};
