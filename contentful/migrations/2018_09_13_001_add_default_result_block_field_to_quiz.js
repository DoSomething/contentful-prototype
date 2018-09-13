module.exports = function(migration) {
  const quiz = migration.editContentType('quiz');

  quiz
    .createField('defaultResultBlock')
    .name('Default Result Block')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['shareAction', 'linkAction', 'quiz'] }])
    .required(false);

  quiz.moveField('defaultResultBlock').afterField('resultBlocks');
};
