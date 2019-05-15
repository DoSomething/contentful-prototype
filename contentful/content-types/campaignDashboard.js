module.exports = function(migration) {
  const campaignDashboard = migration
    .createContentType('campaignDashboard')
    .name('Campaign Dashboard')
    .description('Override the content in the Campaign Dashboard')
    .displayField('internalTitle');

  campaignDashboard
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  campaignDashboard
    .createField('shareHeader')
    .name('Share Header')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignDashboard
    .createField('shareCopy')
    .name('Share Copy')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignDashboard
    .createField('firstValue')
    .name('First Value')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignDashboard
    .createField('firstDescription')
    .name('First Description')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignDashboard
    .createField('secondValue')
    .name('Second Value')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignDashboard
    .createField('secondDescription')
    .name('Second Description')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaignDashboard.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  campaignDashboard.changeEditorInterface('shareHeader', 'singleLine', {
    helpText:
      'Something encouraging you to share the campaign, eg: "Share this campaign".',
  });

  campaignDashboard.changeEditorInterface('shareCopy', 'singleLine', {
    helpText:
      'Something encouraging you to share the campaign, eg: "Every share can...".',
  });

  campaignDashboard.changeEditorInterface('firstValue', 'singleLine', {
    helpText:
      'The first dashboard value presented, this should probably be a bold number.',
  });

  campaignDashboard.changeEditorInterface('firstDescription', 'singleLine', {
    helpText:
      'The description that follows the first dashboard value presented; this should give context to the value.',
  });

  campaignDashboard.changeEditorInterface('secondValue', 'singleLine', {
    helpText:
      'The second dashboard value presented, this should probably be a bold number.',
  });

  campaignDashboard.changeEditorInterface('secondDescription', 'singleLine', {
    helpText:
      'The description that follows the second dashboard value presented; this should give context to the value.',
  });
};
