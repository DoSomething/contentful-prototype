module.exports = function(migration) {
  const person = migration
    .createContentType('person')
    .name('Person')
    .description('A person employed or associated with DoSomething.org.')
    .displayField('name');

  person
    .createField('name')
    .name('Name')
    .type('Symbol')
    .required(true)
    .localized(false);

  person
    .createField('type')
    .name('Type')
    .type('Symbol')
    .validations([
      {
        in: ['staff', 'intern', 'board member', 'advisory board member'],
      },
    ])
    .required(true)
    .localized(true);

  person.changeEditorInterface('type', 'radio');

  person
    .createField('active')
    .name('Active')
    .type('Boolean')
    .required(true)
    .localized(false);

  person
    .createField('jobTitle')
    .name('Job Title')
    .type('Symbol')
    .required(false)
    .localized(true);

  person
    .createField('email')
    .name('Email')
    .type('Symbol')
    .required(false)
    .localized(false);

  person
    .createField('photo')
    .name('Photo')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .localized(false);

  person
    .createField('alternatePhoto')
    .name('Alternate Photo')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .localized(false);

  person
    .createField('description')
    .name('Description')
    .type('Text')
    .required(false)
    .localized(true);
};
