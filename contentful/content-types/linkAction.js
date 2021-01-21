module.exports = function(migration) {
  const linkAction = migration
    .createContentType('linkAction')
    .name('Link Action')
    .description(
      'Displays a card with a customizable title, content and button link. Link clicks are not sent to Rogue and do not count as a reportback.',
    )
    .displayField('internalTitle');

  linkAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  linkAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  linkAction
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  linkAction
    .createField('link')
    .name('Link')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  linkAction
    .createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  linkAction
    .createField('affiliateLogo')
    .name('Affiliate Logo')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  linkAction
    .createField('template')
    .name('Template')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['default', 'cta'],
      },
    ])
    .disabled(true)
    .omitted(false);

  linkAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  linkAction.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});

  linkAction.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Eg: "Take this quiz!" or "Read this article"',
  });

  linkAction.changeFieldControl('content', 'builtin', 'markdown', {
    helpText:
      "This describes the link. Don't use to embed content (e.g., Airtable, Youtube, CartoDB, or Typeform); you must use the Embed. More here -> https://bit.ly/2MgKHVG",
  });

  linkAction.changeFieldControl('link', 'builtin', 'singleLine', {
    helpText:
      'A valid URL e.g. https://dosomething.org, or a link to a valid US telephone number e.g. tel:212 254-2390',
  });

  linkAction.changeFieldControl('buttonText', 'builtin', 'singleLine', {
    helpText: 'If you leave this blank, this will default to "Visit Link"',
  });

  linkAction.changeFieldControl('affiliateLogo', 'builtin', 'assetLinkEditor', {
    helpText:
      'The logo of the partner or sponsor for this link action, which will appear on the bottom of the component.',
  });

  linkAction.changeFieldControl('template', 'builtin', 'radio', {
    helpText:
      'https://dosomething.gitbook.io/phoenix-documentation/content-publishing/actions/link-action#cta-link-action',
  });

  linkAction.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );
};
