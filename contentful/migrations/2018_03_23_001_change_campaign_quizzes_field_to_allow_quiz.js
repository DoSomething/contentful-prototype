module.exports = function (migration) {
  const campaign = migration.editContentType('campaign');

  // https://www.contentfulcommunity.com/t/confusing-validations-error-from-the-migrations-cli/776/4
  campaign.editField('quizzes')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{
        linkContentType: [
          'quizBeta', 'quiz'
        ],
      }]
    });
}
