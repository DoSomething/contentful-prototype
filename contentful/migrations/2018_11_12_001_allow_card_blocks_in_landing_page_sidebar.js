module.exports = function(migration) {
  const block = migration.editContentType('landingPage');

  // @see https://www.contentfulcommunity.com/t/confusing-validations-error-from-the-migrations-cli/776/4
  block.editField('sidebar').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [
      {
        linkContentType: ['campaignUpdate', 'customBlock', 'cardBlock'],
      },
    ],
  });
};
