module.exports = function(migration) {
  const shareAction = migration
    .createContentType('shareAction')
    .name('Share Action')
    .description(
      'Used for adding a dedicated share action to the campaign. For info on how to use this component go to http://bit.ly/share-action',
    )
    .displayField('internalTitle');

  shareAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  shareAction
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .required(false)
    .localized(false)
    .validations([
      {
        unique: true,
      },
    ]);

  shareAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  shareAction
    .createField('socialPlatform')
    .name('Social Platform')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Symbol',

      validations: [
        {
          in: ['facebook', 'twitter'],
          message:
            'Please select either Facebook or Twitter as the social platform for this Share Action',
        },
      ],
    });

  shareAction
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  shareAction
    .createField('link')
    .name('Link')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        regexp: {
          pattern:
            '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$',
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  shareAction
    .createField('hideEmbed')
    .name('Hide Embed')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  shareAction
    .createField('affirmationBlock')
    .name('Affirmation Block')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: [
          'campaignUpdate',
          'customBlock',
          'linkAction',
          'page',
          'affirmation',
          'photoUploaderAction',
          'shareAction',
          'voterRegistrationAction',
        ],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  shareAction
    .createField('affirmation')
    .name('Affirmation Text')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  shareAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  shareAction.changeEditorInterface('internalTitle', 'singleLine', {});

  shareAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue',
  });

  shareAction.changeEditorInterface('title', 'singleLine', {
    helpText: 'Eg: "Share this link"',
  });

  shareAction.changeEditorInterface('socialPlatform', 'checkbox', {
    helpText:
      "Select the social platform to be used by the Share Action's share button. (Limited to Facebook or Twitter).",
  });

  shareAction.changeEditorInterface('content', 'markdown', {
    helpText: 'Descriptive content for the share action',
  });

  shareAction.changeEditorInterface('link', 'singleLine', {
    helpText: 'Link to be shared',
  });

  shareAction.changeEditorInterface('hideEmbed', 'boolean', {
    helpText: 'This will hide the link preview "embed" on the share action.',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  shareAction.changeEditorInterface('affirmationBlock', 'entryLinkEditor', {
    helpText:
      'This block will be displayed in a modal after a successful share. It may be used to thank the user or prompt them to complete another action.',
  });

  shareAction.changeEditorInterface('affirmation', 'markdown', {
    helpText:
      'A quick text-only affirmation message. If an affirmation block is set (above), this will be ignored!',
  });

  shareAction.changeEditorInterface('additionalContent', 'objectEditor', {
    helpText: '',
  });
};
