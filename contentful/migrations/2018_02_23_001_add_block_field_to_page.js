module.exports = function (migration) {
  const page = migration.editContentType('page');

  page.createField('blocks')
    .name('Blocks')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
    })
    .required(false);

  page.moveField('blocks').afterField('sidebar');
}
