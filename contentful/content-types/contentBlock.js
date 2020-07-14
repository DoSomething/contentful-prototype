module.exports = function(migration) {
  const contentBlock = migration
    .createContentType('contentBlock')
    .name('Content Block')
    .description(
      'Content block for adding text content with optional titles and single image.',
    )
    .displayField('internalTitle');

  contentBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  contentBlock
    .createField('superTitle')
    .name('Supertitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  contentBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  contentBlock
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  contentBlock
    .createField('image')
    .name('Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  contentBlock
    .createField('imageAlignment')
    .name('Image Alignment')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Right', 'Left'],
      },
    ])
    .disabled(false)
    .omitted(false);

  contentBlock
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  contentBlock.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  contentBlock.changeFieldControl('superTitle', 'builtin', 'singleLine', {});
  contentBlock.changeFieldControl('title', 'builtin', 'singleLine', {});
  contentBlock.changeFieldControl('content', 'builtin', 'markdown', {});
  contentBlock.changeFieldControl('image', 'builtin', 'assetLinkEditor', {});

  contentBlock.changeFieldControl('imageAlignment', 'builtin', 'radio', {
    helpText:
      'Determines the alignment of the image (if attached) relative to the text content. (Defaults to Right).',
  });

  contentBlock.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );
};
