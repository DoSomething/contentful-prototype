module.exports = function (migration) {
  const page = migration.editContentType('campaignUpdate');

  page.createField('affiliateLogo')
    .name('Affiliate Logo')
    .type('Link')
    .linkType('Asset')
    .validations([{linkMimetypeGroup: ["image"]}])
    .required(false);

  page.moveField('affiliateLogo').afterField('author');
}
