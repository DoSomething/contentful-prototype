module.exports = function(migration) {
  const sixpackExperiment = migration
    .createContentType('sixpackExperiment')
    .name('Sixpack Experiment')
    .description('Used to help set up A/B testing experiments.')
    .displayField('internalTitle');

  sixpackExperiment
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  sixpackExperiment
    .createField('control')
    .name('Test Control')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  sixpackExperiment
    .createField('alternatives')
    .name('Test Alternatives')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          min: 1,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [],
      linkType: 'Entry',
    });

  sixpackExperiment
    .createField('convertableActions')
    .name('Actions To Convert Experiment')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Symbol',

      validations: [
        {
          in: ['signup', 'reportbackPost'],
        },
      ],
    });

  sixpackExperiment
    .createField('trafficFraction')
    .name('Traffic Fraction')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([
      {
        range: {
          min: 1,
          max: 100,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  sixpackExperiment
    .createField('kpi')
    .name('Key Performance Indicator (KPI)')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  sixpackExperiment.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'Used as the title of the Sixpack Experiment; try to keep it short but make it descriptive to distinguish between other experiments.',
  });

  sixpackExperiment.changeEditorInterface('control', 'entryLinkEditor', {
    helpText:
      'Link the default test (the control in the experiment) here. If running a test to compare the absence of a block versus the presence of a block, leave this field empty and it will behave as the "absent block".',
  });

  sixpackExperiment.changeEditorInterface('alternatives', 'entryLinksEditor', {
    helpText: 'Add one or more test alternative block variants here.',
    bulkEditing: false,
  });

  sixpackExperiment.changeEditorInterface('convertableActions', 'checkbox', {
    helpText:
      'Specify what actions will count towards converting the user on the experiment.',
  });

  sixpackExperiment.changeEditorInterface('trafficFraction', 'numberEditor', {
    helpText:
      'Specify the percent of traffic to run the experiment on. Defaults to 100%.',
  });

  sixpackExperiment.changeEditorInterface('kpi', 'singleLine', {
    helpText:
      'Specify a KPI to associate with this experiment in the Sixpack Web Administrative interface.',
  });
};
