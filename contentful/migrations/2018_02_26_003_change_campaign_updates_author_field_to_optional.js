module.exports = function (migration) {
  const block = migration.editContentType('campaignUpdate');

  block.editField('author')
    .required(false);
}
