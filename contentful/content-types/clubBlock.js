module.exports = function(migration) {
  const clubBlock = migration
    .createContentType('clubBlock')
    .name('Club Block')
    .description(
      "Displays the user's club, or allows the user to select a club to join.",
    )
    .displayField('internalTitle');
  clubBlock
    .createField('internalTitle')
    .name('Internal title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  clubBlock.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });
};
