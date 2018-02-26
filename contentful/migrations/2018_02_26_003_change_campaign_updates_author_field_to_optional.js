module.exports = function (migration) {
  const page = migration.editContentType('campaignUpdate');

  page.editField('author')
    .required(false);
}
