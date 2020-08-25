module.exports = function(migration) {
  const currentClubBlock = migration
    .createContentType('currentClubBlock')
    .name('Current Club Block')
    .description(
      "Displays the user's current club, or allows the user to select a club to join.",
    )
    .displayField('internalTitle');
  currentClubBlock
    .createField('internalTitle')
    .name('Internal title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  currentClubBlock.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });
};
