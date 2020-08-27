module.exports = function(migration) {
  const signupReferralsBlock = migration
    .createContentType('signupReferralsBlock')
    .name('Signup Referrals Block')
    .description("Displays current user's signup referrals.")
    .displayField('internalTitle');

  signupReferralsBlock
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

  signupReferralsBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  signupReferralsBlock.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );
  signupReferralsBlock.changeFieldControl('title', 'builtin', 'singleLine', {});
};
