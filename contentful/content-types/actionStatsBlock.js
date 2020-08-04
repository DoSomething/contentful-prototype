module.exports = function(migration) {
  const actionStatsBlock = migration
    .createContentType('actionStatsBlock')
    .name('Action Stats Block')
    .description('Displays leaderboard for an Action ID.')
    .displayField('internalTitle');

  actionStatsBlock
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

  actionStatsBlock
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        range: {
          min: 1,
          max: null,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  actionStatsBlock.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );

  actionStatsBlock.changeFieldControl('actionId', 'builtin', 'numberEditor', {
    helpText: 'The Rogue Action ID to display a leaderboard for.',
  });
};
