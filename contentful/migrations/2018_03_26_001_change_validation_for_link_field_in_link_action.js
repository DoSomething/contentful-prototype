module.exports = function (migration) {
  const linkAction = migration.editContentType('linkAction');

  // @see https://regex101.com/r/8isj1Y/1 for regex explanation
  linkAction.editField('link')
    .validations([{
      regexp: {
        pattern: '^((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$|tel\:?\d[ -.]?\(?\d\d\d\)?[ -.]?\d\d\d[ -.]?\d\d\d\d$)',
      },
    }]);
}
