module.exports = function (migration) {
  const quiz = migration.editContentType('quiz');

  quiz.createField('resultBlocks')
    .name('Result Blocks')
    .type('Link')
    .linkType('Entry')
    .validations([
      { linkContentType: [ 'linkAction', 'shareAction' ] },
    ])
    .required(false);

    quiz.moveField('resultBlocks').beforeField('additionalContent');
}
