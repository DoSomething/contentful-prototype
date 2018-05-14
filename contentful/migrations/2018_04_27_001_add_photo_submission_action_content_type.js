module.exports = function(migration) {
  const photoSubmissionAction = migration
    .createContentType('photoSubmissionAction')
    .name('Photo Submission Action')
    .description('Action block for submitting photo reportback posts.')
    .displayField('internalTitle');

  photoSubmissionAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .localized(false);

  photoSubmissionAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('captionFieldLabel')
    .name('Caption Field Label')
    .type('Symbol')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('captionFieldPlaceholder')
    .name('Caption Field Placeholder')
    .type('Symbol')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('showQuantityField')
    .name('Show Quantity Field')
    .type('Boolean')
    .required(false)
    .localized(false);

  photoSubmissionAction
    .createField('quantityFieldLabel')
    .name('Quantity Field Label')
    .type('Symbol')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('quantityFieldPlaceholder')
    .name('Quantity Field Placeholder')
    .type('Symbol')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('whyParticipatedFieldLabel')
    .name('Why Participated Field Label')
    .type('Symbol')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('whyParticipatedFieldPlaceholder')
    .name('Why Participated Field Placeholder')
    .type('Symbol')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('informationTitle')
    .name('Information Title')
    .type('Symbol')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('informationContent')
    .name('Information Content')
    .type('Text')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('affirmationContent')
    .name('Affirmation Content')
    .type('Text')
    .required(false)
    .localized(true);

  photoSubmissionAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .required(false)
    .localized(false);
};
