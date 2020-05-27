module.exports = function(migration) {
  const voterRegistrationReferralsBlock = migration
    .createContentType('voterRegistrationReferralsBlock')
    .name('Voter Registration Referrals Block')
    .description(
      "Displays current user's number of completed voter registration referrals.",
    )
    .displayField('internalTitle');

  voterRegistrationReferralsBlock
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

  voterRegistrationReferralsBlock.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );
};
