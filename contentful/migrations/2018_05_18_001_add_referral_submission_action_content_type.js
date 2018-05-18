module.exports = function(migration) {
  const referralSubmissionAction = migration
    .createContentType('referralSubmissionAction')
    .name('Referral Submission Action')
    .description('Action block for submitting friend referral posts.')
    .displayField('internalTitle');

  referralSubmissionAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  referralSubmissionAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(false)
    .localized(true);

  referralSubmissionAction
    .createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .required(false)
    .localized(true);

  referralSubmissionAction
    .createField('affirmationContent')
    .name('Affirmation Content')
    .type('Text')
    .required(false)
    .localized(true);

  referralSubmissionAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .required(false)
    .localized(false);
};
