module.exports = function (migration) {
  const block = migration.editContentType('campaignUpdate');

  block.createField('affiliateLogo')
    .name('Affiliate Logo')
    .type('Link')
    .linkType('Asset')
    .validations([{linkMimetypeGroup: ["image"]}])
    .required(false);

  block.moveField('affiliateLogo').afterField('author');
}
