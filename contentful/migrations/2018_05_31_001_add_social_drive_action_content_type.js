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
    .required(true)
    .localized(false);

  socialDriveAction
    .createField('link')
    .name('Link')
    .type('Symbol')
    .required(true)
    .localized(false);
};
