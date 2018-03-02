module.exports = function (migration) {
  const block = migration.editContentType('campaign');

  block.editField('pages')
    .validations([{
      linkContentType: [
        'page', 'customBlock', 'shareAction', 'linkAction',
        'voterRegistrationAction', 'campaignUpdate',
      ],
    }])
}
