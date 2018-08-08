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
    .required(true)
    .localized(false);

  sixpackExperiment
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .localized(true);

  sixpackExperiment
    .createField('alternatives')
    .name('Test Alternatives')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
    })
    .validations([{ size: { min: 2 } }])
    .required(true)
    .localized(false);

  sixpackExperiment
    .createField('trafficFraction')
    .name('Traffic Fraction')
    .type('Integer')
    .validations([{ range: { min: 1, max: 100 } }])
    .required(false)
    .localized(false);

  sixpackExperiment
    .createField('kpi')
    .name('Key Performance Indicator (KPI)')
    .type('Symbol')
    .required(false)
    .localized(true);
};
