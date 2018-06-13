module.exports = function(migration) {
  const quiz = migration.editContentType('quiz');

  quiz
    .createField('hideTitle')
    .name('Hide Title')
    .type('Boolean')
    .required(false)
    .localized(false);

  quiz.moveField('hideTitle').afterField('autoSubmit');
};
