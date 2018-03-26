module.exports = function (migration) {
  const block = migration.editContentType('campaign');

  // @see https://www.contentfulcommunity.com/t/confusing-validations-error-from-the-migrations-cli/776/4
  block.editField('pages')
    .items({
      type: 'Link',
      linkType: 'Entry',
      .validations([{
        linkContentType: [
          'campaignUpdate', 'customBlock', 'linkAction', 'page',
          'photoUploaderAction', 'shareAction', 'voterRegistrationAction',
        ],
      }]
    });
}
