module.exports = function(migration) {
  const voterRegistrationMarketingPage = migration
    .createContentType('voterRegistrationMarketingPage')
    .name('Voter Registration Marketing Page')
    .description(
      'A Voter Registration landing page custom branded for influencers and marketing partners.',
    )
    .displayField('internalTitle');

  voterRegistrationMarketingPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  voterRegistrationMarketingPage
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        size: {
          max: 100,
        },
      },
      {
        regexp: {
          pattern: '^[a-z\\-]+$',
          flags: null,
        },

        message:
          'Only alphanumeric and hyphen characters are allowed in slugs!',
      },
    ])
    .disabled(false)
    .omitted(false);

  voterRegistrationMarketingPage
    .createField('metadata')
    .name('Metadata')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['metadata'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  voterRegistrationMarketingPage
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
      {
        assetImageDimensions: {
          width: {
            min: 1400,
            max: null,
          },

          height: {
            min: 450,
            max: null,
          },
        },
      },
      {
        assetFileSize: {
          min: null,
          max: 20971520,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  voterRegistrationMarketingPage
    .createField('bannerBackgroundColor')
    .name('Banner Background Color')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^#[0-9a-f]{6}$',
          flags: 'i',
        },

        message:
          'Hexadecimal value, must start with a "#" and follow it with 6 characters.',
      },
    ])
    .disabled(false)
    .omitted(false);

  voterRegistrationMarketingPage
    .createField('logo')
    .name('Logo')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        assetImageDimensions: {
          width: {
            min: 250,
            max: null,
          },

          height: {
            min: 60,
            max: null,
          },
        },
      },
      {
        assetFileSize: {
          min: null,
          max: 20971520,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  voterRegistrationMarketingPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  voterRegistrationMarketingPage
    .createField('titleColor')
    .name('Title Color')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^#[0-9a-f]{6}$',
          flags: 'i',
        },

        message:
          'Hexadecimal value, must start with a "#" and follow it with 6 characters.',
      },
    ])
    .disabled(false)
    .omitted(false);

  voterRegistrationMarketingPage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  voterRegistrationMarketingPage
    .createField('subTitleColor')
    .name('SubtitleColor')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^#[0-9a-f]{6}$',
          flags: 'i',
        },

        message:
          'Hexadecimal value, must start with a "#" and follow it with 6 characters.',
      },
    ])
    .disabled(false)
    .omitted(false);

  voterRegistrationMarketingPage
    .createField('voterRegistrationFormButtonText')
    .name('Voter Registration Form Button Text')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  voterRegistrationMarketingPage
    .createField('voterRegistrationFormButtonColor')
    .name('Voter Registration Form Button Color')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^#[0-9a-f]{6}$',
          flags: 'i',
        },

        message:
          'Hexadecimal value, must start with a "#" and follow it with 6 characters.',
      },
    ])
    .disabled(false)
    .omitted(false);

  voterRegistrationMarketingPage
    .createField('source')
    .name('Source')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  voterRegistrationMarketingPage
    .createField('sourceDetails')
    .name('Source Details')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  voterRegistrationMarketingPage
    .createField('content')
    .name('Content')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['sectionBlock'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  voterRegistrationMarketingPage.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'slug',
    'builtin',
    'singleLine',
    {},
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'metadata',
    'builtin',
    'entryLinkEditor',
    {
      helpText: 'The social metadata for this page.',
      showLinkEntityAction: true,
      showCreateEntityAction: true,
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'coverImage',
    'builtin',
    'assetLinkEditor',
    {
      helpText: 'Featured image atop the banner of the page.',
      showLinkEntityAction: true,
      showCreateEntityAction: true,
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'bannerBackgroundColor',
    'builtin',
    'singleLine',
    {
      helpText: 'The background color for the banner.',
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'logo',
    'builtin',
    'assetLinkEditor',
    {
      helpText: 'Logo featured in the page banner.',
      showLinkEntityAction: true,
      showCreateEntityAction: true,
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'title',
    'builtin',
    'singleLine',
    {
      helpText: 'E.g. "Niche wants you to vote".',
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'titleColor',
    'builtin',
    'singleLine',
    {
      helpText: 'Customize the color of the Title.',
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'subTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'E.g. "Take 2 minutes to register to vote at your current address".',
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'subTitleColor',
    'builtin',
    'singleLine',
    {
      helpText: 'Customize the subtitle color.',
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'voterRegistrationFormButtonText',
    'builtin',
    'singleLine',
    {
      helpText:
        'Customize the text on the Voter Registration form submission button.',
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'voterRegistrationFormButtonColor',
    'builtin',
    'singleLine',
    {
      helpText:
        'Customize the Voter Registration form submission button background color. ',
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'source',
    'builtin',
    'singleLine',
    {
      helpText:
        'The "source" value in the Rock the Vote redirect URL. (Defaults to "web").',
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'sourceDetails',
    'builtin',
    'singleLine',
    {
      helpText:
        'The value of the "sourceDetails" in the Rock The Vote Redirect URL. (Defaults to "voter_registration_marketing_page").',
    },
  );

  voterRegistrationMarketingPage.changeFieldControl(
    'content',
    'builtin',
    'entryLinkEditor',
    {
      helpText: 'The content for this page.',
      showLinkEntityAction: true,
      showCreateEntityAction: true,
    },
  );
};
