module.exports = function(migration) {
  const page = migration.editContentType('page');

  page
    .createField('authors')
    .name('Authors')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [
        {
          linkContentType: ['person'],
        },
      ],
    })
    .required(false);

  page.moveField('authors').afterField('slug');
};
