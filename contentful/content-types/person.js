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
    .createField('avatar')
    .name('Avatar')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .localized(false);

  person
    .createField('alternateAvatar')
    .name('Alternate Avatar')
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

  person
    .createField('advisoryCommittee')
    .name('Type')
    .type('Symbol')
    .validations([
      {
        in: ['tech', 'corporate', 'finance', 'marketing', 'civic engagement'],
      },
    ])
    .required(false)
    .localized(true);

  person.changeEditorInterface('advisoryCommittee', 'radio');
};
