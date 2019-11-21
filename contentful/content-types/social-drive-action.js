module.exports = function(migration) {
  const socialDriveAction = migration
    .createContentType('socialDriveAction')
    .name('Social Drive Action')
    .description(
      'An Action block for social drives for link sharing and page view tracking.',
    )
    .displayField('internalTitle');

  socialDriveAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  socialDriveAction
    .createField('link')
    .name('Link')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  socialDriveAction
    .createField('hidePageViews')
    .name('Hide Page Views')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  socialDriveAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );
  socialDriveAction.changeFieldControl('link', 'builtin', 'singleLine', {});

  socialDriveAction.changeFieldControl('hidePageViews', 'builtin', 'boolean', {
    helpText:
      "By default, we'll display the page views for the provided Bertly link in an info card adjacent to the Social Drive Action. You can toggle this off here!",
    trueLabel: 'Yes',
    falseLabel: 'No',
  });
};
