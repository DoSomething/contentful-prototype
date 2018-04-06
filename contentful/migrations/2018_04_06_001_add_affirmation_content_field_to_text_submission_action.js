module.exports = function (migration) {
  const textSubmissionAction = migration.editContentType('textSubmissionAction');

  textSubmissionAction.createField('affirmationContent')
    .name('Affirmation Content')
    .type('Text')
    .required(false)
    .localized(true);

  textSubmissionAction.moveField('affirmationContent').beforeField('additionalContent');
}
