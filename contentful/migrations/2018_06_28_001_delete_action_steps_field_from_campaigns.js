module.exports = function(migration) {
  const campaign = migration.editContentType('campaign');

  campaign.deleteField('actionSteps');
};
