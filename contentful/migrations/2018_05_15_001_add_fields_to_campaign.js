module.exports = function(migration) {
  const campaign = migration.editContentType('campaign');

  campaign
    .createField('staffPick')
    .name('Staff Pick')
    .type('Boolean')
    .required(false)
    .localized(false);

  campaign
    .createField('causes')
    .name('Causes')
    .type('Array')
    .items({
      type: 'Symbol',
      validations: [
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
      ],
    })
    .required(false)
    .localized(true);

  campaign.changeEditorInterface('cause', 'checkbox');

  campaign
    .createField('scholarshipAmount')
    .name('Scholarship Amount')
    .type('Integer')
    .required(false)
    .localized(false);

  campaign.moveField('additionalContent').afterField('scholarshipAmount');
};
