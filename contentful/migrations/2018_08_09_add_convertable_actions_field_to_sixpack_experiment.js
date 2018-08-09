module.exports = function(migration) {
  const sixpackExperiment = migration.editContentType('sixpackExperiment');

  sixpackExperiment
    .createField('convertableActions')
    .name('Actions To Convert Experiment')
    .type('Array')
    .items({
      type: 'Symbol',
      validations: [
        {
          in: ['signup', 'reportbackPost', 'clickedButton'],
        },
      ],
    })
    .validations([{ size: { min: 1 } }]);
    .required(true)
    .localized(false)

  sixpackExperiment.moveField('convertableActions').afterField('alternatives');
};
