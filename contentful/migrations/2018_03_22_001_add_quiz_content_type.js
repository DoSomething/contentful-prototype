module.exports = function (migration) {
  const quiz = migration.createContentType('quiz')
    .name('Quiz')
    .description('Models a (BuzzFeed style) results oriented quiz')
    .displayField('internalTitle');

  quiz.createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  quiz.createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .localized(true);

  quiz.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([{'unique': true}])
    .localized(false);

  quiz.createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .required(false)
    .localized(false);
}
