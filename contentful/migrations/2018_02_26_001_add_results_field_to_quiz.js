module.exports = function (migration) {
  const quiz = migration.editContentType('quizBeta');

  quiz.createField('results')
    .name('Results')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
    })
    .required(false);

  quiz.moveField('results').beforeField('questions');
}
