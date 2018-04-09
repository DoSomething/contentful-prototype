module.exports = function (migration) {
  const quiz = migration.editContentType('quiz');

  quiz.createField('results')
    .name('Results')
    .type('Object')
    .required(true);

  quiz.createField('questions')
    .name('Questions')
    .type('Object')
    .required(true);

  quiz.moveField('results').beforeField('resultBlocks');
  quiz.moveField('questions').beforeField('resultBlocks');
}
