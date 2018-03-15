module.exports = function (migration) {
  const textSubmissionAction = migration.createContentType('textSubmissionAction')
    .name('Text Submission Action')
    .description('Action block for submitting text reportback posts.')
    .displayField('internalTitle');

  textSubmissionAction.createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  textSubmissionAction.createField('title')
    .name('Title')
    .type('Symbol')
    .required(false)
    .localized(true);

  textSubmissionAction.createField('textFieldLabel')
    .name('Text Field Label')
    .type('Symbol')
    .required(false)
    .localized(true);

  textSubmissionAction.createField('textFieldPlaceholder')
    .name('Text Field Placeholder Message')
    .type('Symbol')
    .required(false)
    .localized(true);

  textSubmissionAction.createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .required(false)
    .localized(true);

  textSubmissionAction.createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .required(false)
    .localized(false);
}
