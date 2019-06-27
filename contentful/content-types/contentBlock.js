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
    .createField('subTitle')
    .name('Subtitle')
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
    .required(false)
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
  contentBlock.changeEditorInterface('internalTitle', 'singleLine', {});
  contentBlock.changeEditorInterface('superTitle', 'singleLine', {});
  contentBlock.changeEditorInterface('title', 'singleLine', {});
  contentBlock.changeEditorInterface('subTitle', 'singleLine', {});
  contentBlock.changeEditorInterface('content', 'markdown', {});
  contentBlock.changeEditorInterface('image', 'assetLinkEditor', {});

  contentBlock.changeEditorInterface('imageAlignment', 'radio', {
    helpText:
      'Determines the alignment of the image (if attached) relative to the text content. (Defaults to Right).',
  });

  contentBlock.changeEditorInterface('additionalContent', 'objectEditor', {});
};
