module.exports = function(migration) {
  const quiz = migration.editContentType('quiz');

  quiz
    .createField('autoSubmit')
    .name('Auto Submit Quiz')
    .type('Boolean')
    .required(true)
    .localized(false);

  quiz.moveField('autoSubmit').afterField('slug');
};
