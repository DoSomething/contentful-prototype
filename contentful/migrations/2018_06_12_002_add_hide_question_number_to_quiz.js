module.exports = function(migration) {
  const quiz = migration.editContentType('quiz');

  quiz
    .createField('hideQuestionNumber')
    .name('Hide Question Number')
    .type('Boolean')
    .required(false)
    .localized(false);

  quiz.moveField('hideQuestionNumber').afterField('autoSubmit');
};
