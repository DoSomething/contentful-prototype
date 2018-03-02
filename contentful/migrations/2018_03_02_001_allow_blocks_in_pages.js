module.exports = function (migration) {
  const block = migration.editContentType('campaign');

  block.editField('pages')
    .validations([{
      linkContentType: [
        'campaignUpdate', 'customBlock', 'linkAction', 'page',
        'photoUploaderAction', 'shareAction', 'voterRegistrationAction',
      ],
    }])
}
