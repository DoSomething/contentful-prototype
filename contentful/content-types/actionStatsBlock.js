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

  actionStatsBlock
    .createField('groupTypeId')
    .name('Group Type ID')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([])
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

  actionStatsBlock.changeFieldControl(
    'groupTypeId',
    'builtin',
    'numberEditor',
    {
      helpText:
        'If set, filters stats to only show schools that have groups in this group type. See https://activity.dosomething.org/groups for list of group types.',
    },
  );
};
