module.exports = function(migration) {
  const campaign = migration.editContentType('campaign');

  campaign
    .createField('staffPick')
    .name('Staff Pick')
    .type('Boolean')
    .required(false)
    .localized(false);

  campaign
    .createField('cause')
    .name('Cause')
    .type('Symbol')
    .validations([
      {
        in: [
          'animals',
          'bullying',
          'disasters',
          'discrimination',
          'education',
          'environment',
          'homelessness',
          'mental health',
          'physical health',
          'poverty',
          'relationships',
          'sex',
          'violence',
        ],
      },
    ])
    .required(false)
    .localized(true);

  campaign.changeEditorInterface('cause', 'radio');

  campaign
    .createField('scholarshipAmount')
    .name('Scholarship Amount')
    .type('Integer')
    .required(false)
    .localized(false);

  campaign.moveField('additionalContent').afterField('scholarshipAmount');
};
