module.exports = function(migration) {
  const page = migration.editContentType('page');

  page
    .createField('displaySocialShare')
    .name('Display Social Share')
    .type('Boolean')
    .required(false)
    .localized(false);

  page.moveField('displaySocialShare').afterField('blocks');
};
