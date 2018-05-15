module.exports = function(migration) {
  const campaign = migration.editContentType('campaign');

  campaign
    .createField('staffPick')
    .name('Staff Pick')
    .type('Boolean')
    .required(false)
    .localized(true);

  campaign
    .createField('cause')
    .name('Cause')
    .type('Array')
    .items({
      type: 'Symbol',
      validations: [
        {
          in: [
            'Animals',
            'Bullying',
            'Disasters',
            'Discrimination',
            'Education',
            'Environment',
            'Homelessness',
            'Mental Health',
            'Physical Health',
            'Poverty',
            'Relationships',
            'Sex',
            'Violence',
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
    .required(false);

  campaign.moveField('additionalContent').afterField('scholarshipAmount');
};
