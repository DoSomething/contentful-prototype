module.exports = function (migration) {
  const campaign = migration.editContentType('campaign');

  campaign.editField('quizzes')
    .validations([{
      linkContentType: [
        'quizBeta', 'quiz'
      ],
    }]);
}
