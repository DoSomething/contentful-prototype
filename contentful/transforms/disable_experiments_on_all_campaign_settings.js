// Transformation to disable all A/B experiment participation on
// all campaignSettings content types.
module.exports = function (migration) {
  migration.transformEntries({
    contentType: 'campaignSettings',
    from: ['allowExperiments'],
    to: ['allowExperiments'],
    transformEntryForLocale: function (fromFields, currentLocale) {
      return { allowExperiments: false };
    }
  });
}
