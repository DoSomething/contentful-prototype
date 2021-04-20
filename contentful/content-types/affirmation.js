module.exports = function(migration) {
  const affirmation = migration
    .createContentType('affirmation')
    .name('Affirmation')
    .description('What the user sees post-signup!')
    .displayField('header');
  affirmation
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  affirmation
    .createField('header')
    .name('Header')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  affirmation
    .createField('photo')
    .name('Photo')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(true)
    .omitted(false)
    .linkType('Asset');
  affirmation
    .createField('quote')
    .name('Quote')
    .type('Text')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  affirmation
    .createField('newAuthor')
    .name('Author')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['person'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  affirmation
    .createField('author')
    .name('Legacy Author')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(true)
    .omitted(false);

  affirmation.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  affirmation.changeFieldControl('header', 'builtin', 'singleLine', {});
  affirmation.changeFieldControl('photo', 'builtin', 'assetLinkEditor', {});
  affirmation.changeFieldControl('quote', 'builtin', 'markdown', {});
  affirmation.changeFieldControl('newAuthor', 'builtin', 'entryLinkEditor', {});
  affirmation.changeFieldControl('author', 'builtin', 'singleLine', {});
};
