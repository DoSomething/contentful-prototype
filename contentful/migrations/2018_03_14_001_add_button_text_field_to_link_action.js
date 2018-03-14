module.exports = function (migration) {
  const linkAction = migration.editContentType('linkAction');

  linkAction.createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .required(false);

  linkAction.moveField('buttonText').afterField('link');
}
