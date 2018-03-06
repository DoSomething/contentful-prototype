module.exports = function (migration) {
  const shareAction = migration.editContentType('shareAction');

  // Add 'affirmationBlock' link field to Share Actions.
  shareAction.createField('affirmationBlock')
    .name('Affirmation Block')
    .type('Link')
    .linkType('Entry')
    .validations([
      {
        linkContentType: [
          'campaignUpdate', 'customBlock', 'linkAction', 'page', 'affirmation',
          'photoUploaderAction', 'shareAction', 'voterRegistrationAction',
        ],
      },
    ])
    .required(false);

  shareAction.moveField('affirmationBlock').beforeField('affirmation');

  // Change description of existing 'Affirmation' field.
  shareAction.editField('affirmation')
    .name('Affirmation Text');
};
