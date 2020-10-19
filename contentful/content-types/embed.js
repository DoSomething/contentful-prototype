module.exports = function(migration) {
  const embed = migration
    .createContentType('embed')
    .name('Embed')
    .description(
      'Embeds content directly onto page for supported URLs (Airtable, Carto, Youtube, Typeform) or displays an embedded link to the page by default.',
    )
    .displayField('internalTitle');

  embed
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  embed
    .createField('url')
    .name('URL')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  embed.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  embed.changeFieldControl('url', 'builtin', 'singleLine', {
    helpText: 'The URL for the embed.',
  });
};
