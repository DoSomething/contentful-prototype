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

  const homePage = migration
    .createContentType('homePage')
    .name('Home Page')
    .description('The Home Page for DoSomething.org.')
    .displayField('internalTitle');
  homePage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  homePage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  homePage
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
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

  homePage
    .createField('campaigns')
    .name('Campaigns')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['campaign', 'collectionPage', 'storyPage'],
          message:
            'Only Campaign, StoryPage, and CollectionPage entries are valid.',
        },
      ],

      linkType: 'Entry',
    });

  homePage
    .createField('articles')
    .name('Articles')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['page'],
        },
      ],

      linkType: 'Entry',
    });

  homePage
    .createField('sponsors')
    .name('Sponsors')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['affiliates'],
        },
      ],

      linkType: 'Entry',
    });

  homePage
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  homePage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  homePage.changeFieldControl('title', 'builtin', 'singleLine', {});
  homePage.changeFieldControl('coverImage', 'builtin', 'assetLinkEditor', {});

  homePage.changeFieldControl('campaigns', 'builtin', 'entryLinksEditor', {
    helpText:
      'Add campaigns (Campaign, StoryPage, or CollectionPage (https://bit.ly/2HlM3Mk) entries) to showcase on the home page.',
    bulkEditing: false,
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  homePage.changeFieldControl('articles', 'builtin', 'entryLinksEditor', {
    helpText: 'Add articles (Page entries) to showcase on the home page.',
    bulkEditing: false,
  });

  homePage.changeFieldControl('sponsors', 'builtin', 'entryLinksEditor', {});
  homePage.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );

  const externalLink = migration
    .createContentType('externalLink')
    .name('External Link')
    .description(
      'An clickable card showcasing an external link with a customizable provider image, title, and description.',
    )
    .displayField('internalTitle');

  externalLink
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  externalLink
    .createField('url')
    .name('URL')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        regexp: {
          pattern:
            '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
          flags: null,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  externalLink
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  externalLink
    .createField('description')
    .name('Description')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  externalLink
    .createField('image')
    .name('Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
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

  externalLink.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  externalLink.changeFieldControl('url', 'builtin', 'singleLine', {});

  externalLink.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Optionally override the URL provider title.',
  });

  externalLink.changeFieldControl('description', 'builtin', 'singleLine', {
    helpText: 'Optionally override the URL provider description',
  });

  externalLink.changeFieldControl('image', 'builtin', 'assetLinkEditor', {
    helpText: 'Optionally override the URL provider image.',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  const galleryBlock = migration
    .createContentType('galleryBlock')
    .name('Gallery Block')
    .description('Displays a gallery of referenced entries')
    .displayField('internalTitle');
  galleryBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  galleryBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  galleryBlock
    .createField('galleryType')
    .name('Gallery Type')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        in: [
          'Campaign',
          'Scholarship',
          'Page',
          'Person',
          'Content Block',
          'External Link',
        ],

        message: 'Please choose a gallery type.',
      },
    ])
    .disabled(false)
    .omitted(false);

  galleryBlock
    .createField('blocks')
    .name('Blocks')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: [
            'campaign',
            'contentBlock',
            'externalLink',
            'page',
            'person',
            'storyPage',
          ],
        },
      ],

      linkType: 'Entry',
    });

  galleryBlock
    .createField('itemsPerRow')
    .name('Items Per Row')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        in: [2, 3, 4, 5],
      },
    ])
    .disabled(false)
    .omitted(false);

  galleryBlock
    .createField('imageAlignment')
    .name('Image Alignment')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        in: ['top', 'left'],
      },
    ])
    .disabled(false)
    .omitted(false);

  galleryBlock
    .createField('imageFit')
    .name('Image Fit')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['fill', 'pad'],
      },
    ])
    .disabled(false)
    .omitted(false);

  galleryBlock.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  galleryBlock.changeFieldControl('title', 'builtin', 'singleLine', {});

  galleryBlock.changeFieldControl('galleryType', 'builtin', 'dropdown', {
    helpText:
      'Choose a gallery type that directly matches your referenced entry types. ("Scholarship": a list of Campaigns embellished with scholarship info).',
  });

  galleryBlock.changeFieldControl('blocks', 'builtin', 'entryLinksEditor', {
    helpText:
      "The list of entries displayed in the gallery. These entries must all be of the *same type*, e.g. a list of Campaign entries. You shouldn't mix and match content types.",
    bulkEditing: false,
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  galleryBlock.changeFieldControl('itemsPerRow', 'builtin', 'radio', {
    helpText:
      'The maximum number of items in a single row when viewing the gallery in a large display.',
  });

  galleryBlock.changeFieldControl('imageAlignment', 'builtin', 'radio', {
    helpText:
      "Determines where the gallery item's images are aligned relative to their text.",
  });

  galleryBlock.changeFieldControl('imageFit', 'builtin', 'radio', {
    helpText:
      "Controls the cropping method for the gallery images. 'Fill' will resize the images to ensure they      fit neatly into a square, cropping the image if needed. 'Pad' will do the same but will add padding      to the image instead of cropping it.",
  });

  const embed = migration
    .createContentType('embed')
    .name('Embed')
    .description(
      'Embeds content directly onto page for supported URLs (Airtable, DoSomething CartoDB, Youtube, DoSomething Typeform).',
    )
    .displayField('internalTitle');

  embed
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  embed
    .createField('url')
    .name('URL')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  embed.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  embed.changeFieldControl('url', 'builtin', 'singleLine', {
    helpText: 'The URL for the embed.',
  });

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
    .validations([
      {
        regexp: {
          pattern:
            '^((ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$|tel\\:?\\d[ -.]?\\(?\\d\\d\\d\\)?[ -.]?\\d\\d\\d[ -.]?\\d\\d\\d\\d$)',
          flags: null,
        },
      },
    ])
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
    {
      helpText: 'Used for quiz results (set "sourceDetails" property)',
    },
  );

  const photoSubmissionAction = migration
    .createContentType('photoSubmissionAction')
    .name('Photo Submission Action')
    .description('Action block for submitting photo reportback posts.')
    .displayField('internalTitle');
  photoSubmissionAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('captionFieldLabel')
    .name('Caption Field Label')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('captionFieldPlaceholder')
    .name('Caption Field Placeholder')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('showQuantityField')
    .name('Show Quantity Field')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('quantityFieldLabel')
    .name('Quantity Field Label')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('quantityFieldPlaceholder')
    .name('Quantity Field Placeholder')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('whyParticipatedFieldLabel')
    .name('Why Participated Field Label')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('whyParticipatedFieldPlaceholder')
    .name('Why Participated Field Placeholder')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('informationTitle')
    .name('Information Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('informationContent')
    .name('Information Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('affirmationContent')
    .name('Affirmation Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  photoSubmissionAction
    .createField('numberOfParticipantsFieldLabel')
    .name('Number Of Participants Field Label')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  photoSubmissionAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        '(Example: "Teens for Jeans 2017 Photo Submission Action") Use the campaign title, year and append "Photo Submission Action".',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'actionId',
    'builtin',
    'numberEditor',
    {
      helpText: 'The Action ID associated with this action in Rogue',
    },
  );

  photoSubmissionAction.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText:
      'Title to display for this block (defaults to "Submit your photo").',
  });

  photoSubmissionAction.changeFieldControl(
    'captionFieldLabel',
    'builtin',
    'singleLine',
    {
      helpText:
        'The label for the caption field (defaults to "Add a caption to your photo.").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'captionFieldPlaceholder',
    'builtin',
    'singleLine',
    {
      helpText:
        'The placeholder for the caption field (defaults to "60 characters or less").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'showQuantityField',
    'builtin',
    'boolean',
    {
      helpText:
        "Should the form ask for the quantity of items in member's photo submission?",
      trueLabel: 'Yes',
      falseLabel: 'No',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'quantityFieldLabel',
    'builtin',
    'singleLine',
    {
      helpText:
        'The label for the quantity field (default to "How many items are in this photo?").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'quantityFieldPlaceholder',
    'builtin',
    'singleLine',
    {
      helpText:
        'The placeholder for the quantity field (defaults to "Use numbers (e.g. 1)").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'whyParticipatedFieldLabel',
    'builtin',
    'singleLine',
    {
      helpText:
        'The label for the why participated field (defaults to "Why is this campaign important to you?").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'whyParticipatedFieldPlaceholder',
    'builtin',
    'singleLine',
    {
      helpText:
        'The placeholder for the why participated field (defaults to "No need to write an essay, but we\'d love to see why this matters to you!").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'buttonText',
    'builtin',
    'singleLine',
    {
      helpText:
        'The text to show for the submit button (defaults to "Submit a new photo").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'informationTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'Title to display for the information block (defaults to "More Info").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'informationContent',
    'builtin',
    'markdown',
    {
      helpText:
        'Content to display for the information block (defaults to "A DoSomething staffer will review and approve your photo.").',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'affirmationContent',
    'builtin',
    'markdown',
    {
      helpText:
        'The text for the affirmation pop up after successful submission (contains a suitable default).',
    },
  );

  photoSubmissionAction.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );

  photoSubmissionAction.changeFieldControl(
    'numberOfParticipantsFieldLabel',
    'builtin',
    'singleLine',
    {
      helpText:
        'This question will ONLY show up if the label is filled out. ONLY use this field to ask members about how many people they did this campaign with. We recommend starting with "including yourself" so that users don\'t feel bad if they did it alone.',
    },
  );

  const voterRegistrationDriveAction = migration
    .createContentType('voterRegistrationDriveAction')
    .name('Voter Registration Drive Action')
    .description('A Social Drive Action for voter registration drives.')
    .displayField('internalTitle');

  voterRegistrationDriveAction
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

  voterRegistrationDriveAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  voterRegistrationDriveAction
    .createField('description')
    .name('Description')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  voterRegistrationDriveAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );
  voterRegistrationDriveAction.changeFieldControl(
    'title',
    'builtin',
    'singleLine',
    {},
  );
  voterRegistrationDriveAction.changeFieldControl(
    'description',
    'builtin',
    'markdown',
    {},
  );

  const page = migration
    .createContentType('page')
    .name('Page')
    .description(
      'A custom page, for example a campaign FAQ or scholarship rules, or a standalone article or 11-facts page.',
    )
    .displayField('internalTitle');

  page
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  page
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  page
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
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
          pattern: '^[a-zA-Z0-9-/]+$',
          flags: null,
        },

        message:
          'Only alphanumeric, forward-slash, and hyphen characters are allowed in slugs!',
      },
      {
        prohibitRegexp: {
          pattern: '^about\\/.+?$',
          flags: null,
        },

        message:
          '"about/" pages should use a Company Page entry. (Existing "about/" pages have been automatically ported over).',
      },
    ])
    .disabled(false)
    .omitted(false);

  page
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

  page
    .createField('authors')
    .name('Authors')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 2,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['person'],
        },
      ],

      linkType: 'Entry',
    });

  page
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
      {
        assetFileSize: {
          max: 20971520,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  page
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField('blocks')
    .name('Blocks')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: [
            'actionStatsBlock',
            'callToAction',
            'campaignUpdate',
            'contentBlock',
            'currentClubBlock',
            'currentSchoolBlock',
            'customBlock',
            'embed',
            'galleryBlock',
            'imagesBlock',
            'linkAction',
            'petitionSubmissionAction',
            'photoSubmissionAction',
            'postGallery',
            'quiz',
            'selectionSubmissionAction',
            'shareAction',
            'signupReferralsBlock',
            'sixpackExperiment',
            'socialDriveAction',
            'softEdgeWidgetAction',
            'textSubmissionAction',
            'voterRegistrationAction',
            'voterRegistrationDriveAction',
            'voterRegistrationReferralsBlock',
          ],
        },
      ],

      linkType: 'Entry',
    });

  page
    .createField('displaySocialShare')
    .name('Display Social Share')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  page
    .createField('hideFromNavigation')
    .name('Hide From Navigation')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  page
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  page.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  page.changeFieldControl('title', 'builtin', 'singleLine', {});
  page.changeFieldControl('subTitle', 'builtin', 'singleLine', {});

  page.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'For an article page prefix with "articles/", a fact page prefix with "facts/", for a campaign page, prefix the slug with the campaign entry\'s slug value e.g. "teens-for-jeans/action". ("about/" pages should use a Company Page entry)',
  });

  page.changeFieldControl('metadata', 'builtin', 'entryLinkEditor', {});
  page.changeFieldControl('authors', 'builtin', 'entryLinksEditor', {});

  page.changeFieldControl('coverImage', 'builtin', 'assetLinkEditor', {
    helpText: 'The cover image will display on the page before the content.',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  page.changeFieldControl('content', 'builtin', 'markdown', {});

  page.changeFieldControl('blocks', 'builtin', 'entryLinksEditor', {
    bulkEditing: false,
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  page.changeFieldControl('displaySocialShare', 'builtin', 'boolean', {
    helpText:
      "Select 'Yes' to display Social Sharing buttons on the bottom of the page. (Facebook & Twitter).",
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  page.changeFieldControl('hideFromNavigation', 'builtin', 'boolean', {
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  page.changeFieldControl('additionalContent', 'builtin', 'objectEditor', {});
  const actionStatsBlock = migration
    .createContentType('actionStatsBlock')
    .name('Action Stats Block')
    .description('Displays leaderboard for an Action ID.')
    .displayField('internalTitle');

  actionStatsBlock
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

  actionStatsBlock
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        range: {
          min: 1,
          max: null,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  actionStatsBlock
    .createField('groupTypeId')
    .name('Group Type ID')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  actionStatsBlock.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );

  actionStatsBlock.changeFieldControl('actionId', 'builtin', 'numberEditor', {
    helpText: 'The Rogue Action ID to display a leaderboard for.',
  });

  actionStatsBlock.changeFieldControl(
    'groupTypeId',
    'builtin',
    'numberEditor',
    {
      helpText:
        'If set, filters stats to only show schools that have groups in this group type. See https://activity.dosomething.org/groups for list of group types.',
    },
  );

  const companyPage = migration
    .createContentType('companyPage')
    .name('Company Page')
    .description(
      'A custom page for DoSomething static pages with company information.',
    )
    .displayField('internalTitle');
  companyPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  companyPage
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
          pattern: '^[a-z0-9\\-]+$',
        },

        message:
          'Only alphanumeric and hyphen characters are allowed in slugs!',
      },
    ])
    .disabled(false)
    .omitted(false);

  companyPage
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

  companyPage
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
      {
        assetFileSize: {
          max: 20971520,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  companyPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  companyPage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  companyPage
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(true)
    .validations([
      {
        enabledNodeTypes: [
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'embedded-entry-block',
          'embedded-asset-block',
          'hyperlink',
          'asset-hyperlink',
        ],

        message:
          'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, link to Url, and link to asset nodes are allowed',
      },
      {
        nodes: {
          'embedded-entry-block': [
            {
              linkContentType: [
                'callToAction',
                'contentBlock',
                'embed',
                'galleryBlock',
                'imagesBlock',
                'linkAction',
              ],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  companyPage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});

  companyPage.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'e.g. "our-team". The URL for the Company Page will be prefixed with "about/" e.g. "https://dosomething.org/us/about/our-team".',
  });

  companyPage.changeFieldControl('metadata', 'builtin', 'entryLinkEditor', {});
  companyPage.changeFieldControl(
    'coverImage',
    'builtin',
    'assetLinkEditor',
    {},
  );
  companyPage.changeFieldControl('title', 'builtin', 'singleLine', {});
  companyPage.changeFieldControl('subTitle', 'builtin', 'singleLine', {});
  companyPage.changeFieldControl('content', 'builtin', 'richTextEditor', {});
  const signupReferralsBlock = migration
    .createContentType('signupReferralsBlock')
    .name('Signup Referrals Block')
    .description("Displays current user's signup referrals.")
    .displayField('internalTitle');

  signupReferralsBlock
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

  signupReferralsBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  signupReferralsBlock.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );
  signupReferralsBlock.changeFieldControl('title', 'builtin', 'singleLine', {});
  const sectionBlock = migration
    .createContentType('sectionBlock')
    .name('Section Block')
    .description('Block used to showcase a section of art-directed content.')
    .displayField('internalTitle');
  sectionBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  sectionBlock
    .createField('backgroundColor')
    .name('Background Color')
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

  sectionBlock
    .createField('textColor')
    .name('Text Color')
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

  sectionBlock
    .createField('hyperlinkColor')
    .name('Hyperlink Color')
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

  sectionBlock
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([
      {
        enabledMarks: ['bold', 'italic', 'underline'],
        message: 'Only bold, italic, and underline marks are allowed',
      },
      {
        enabledNodeTypes: [
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'ordered-list',
          'unordered-list',
          'blockquote',
          'embedded-entry-block',
          'embedded-asset-block',
          'heading-1',
          'hyperlink',
        ],

        message:
          'Only heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, quote, block entry, asset, heading 1, and link to Url nodes are allowed',
      },
      {
        nodes: {
          'embedded-entry-block': [
            {
              linkContentType: [
                'callToAction',
                'campaignUpdate',
                'cardBlock',
                'contentBlock',
                'currentClubBlock',
                'embed',
                'imagesBlock',
                'linkAction',
                'petitionSubmissionAction',
                'photoSubmissionAction',
                'postGallery',
                'shareAction',
                'socialDriveAction',
                'textSubmissionAction',
                'voterRegistrationAction',
              ],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  sectionBlock.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  sectionBlock.changeFieldControl(
    'backgroundColor',
    'builtin',
    'singleLine',
    {},
  );
  sectionBlock.changeFieldControl('textColor', 'builtin', 'singleLine', {});
  sectionBlock.changeFieldControl(
    'hyperlinkColor',
    'builtin',
    'singleLine',
    {},
  );
  sectionBlock.changeFieldControl('content', 'builtin', 'richTextEditor', {});

  const currentClubBlock = migration
    .createContentType('currentClubBlock')
    .name('Current Club Block')
    .description(
      "Displays the user's current club, or allows the user to select a club to join.",
    )
    .displayField('internalTitle');

  currentClubBlock
    .createField('internalTitle')
    .name('Internal title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  currentClubBlock.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
    },
  );

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
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  socialDriveAction
    .createField('description')
    .name('Description')
    .type('Text')
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
  socialDriveAction.changeFieldControl('title', 'builtin', 'singleLine', {});
  socialDriveAction.changeFieldControl(
    'description',
    'builtin',
    'markdown',
    {},
  );

  const storyPage = migration
    .createContentType('storyPage')
    .name('StoryPage')
    .description(
      'Story pages are used for helping craft a story or experience on a single web page.',
    )
    .displayField('internalTitle');

  storyPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  storyPage
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
          pattern: '^(?!\\/)stories\\/[a-zA-Z0-9-/]+$',
          flags: '',
        },

        message:
          'Only alphanumeric, forward-slash, and hyphen characters are allowed in slugs! Entry must begin with "stories/".',
      },
    ])
    .disabled(false)
    .omitted(false);

  storyPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  storyPage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  storyPage
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

  storyPage
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
      {
        assetImageDimensions: {
          width: {
            min: 1440,
            max: null,
          },

          height: {
            min: 610,
            max: null,
          },
        },

        message:
          'The provided image needs to be at least 1440px wide by 610px tall.',
      },
      {
        assetFileSize: {
          max: 20971520,
        },

        message: 'Cover images cannot be more than 20 megabytes.',
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  storyPage
    .createField('blocks')
    .name('Blocks')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['actionStatsBlock', 'callToAction', 'sectionBlock'],
        },
      ],

      linkType: 'Entry',
    });

  storyPage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  storyPage.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'Must begin with the "stories/" category prefix for the slug, e.g. "stories/page-name-here".',
  });

  storyPage.changeFieldControl('title', 'builtin', 'singleLine', {});
  storyPage.changeFieldControl('subTitle', 'builtin', 'singleLine', {});
  storyPage.changeFieldControl('metadata', 'builtin', 'entryLinkEditor', {});

  storyPage.changeFieldControl('coverImage', 'builtin', 'assetLinkEditor', {
    helpText:
      'This cover image is used in the banner at the top of the Story Page, as well as for the tile on home page and explore campaigns.',
  });

  storyPage.changeFieldControl('blocks', 'builtin', 'entryLinksEditor', {
    bulkEditing: false,
  });

  const campaignUpdate = migration
    .createContentType('campaignUpdate')
    .name('Campaign Update')
    .description('')
    .displayField('internalTitle');
  campaignUpdate
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignUpdate
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaignUpdate
    .createField('link')
    .name('Link')
    .type('Symbol')
    .localized(false)
    .required(false)
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

  campaignUpdate
    .createField('author')
    .name('Author')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['person'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  campaignUpdate
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

  campaignUpdate.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  campaignUpdate.changeFieldControl('content', 'builtin', 'markdown', {});

  campaignUpdate.changeFieldControl('link', 'builtin', 'urlEditor', {
    helpText:
      'Link content will be inserted after the copy in the content field.',
  });

  campaignUpdate.changeFieldControl('author', 'builtin', 'entryLinkEditor', {});

  campaignUpdate.changeFieldControl(
    'affiliateLogo',
    'builtin',
    'assetLinkEditor',
    {
      helpText:
        "The logo of the partner or sponsor you want to highlight, adding this field will cause this campaign update to be rendered in 'affiliate' mode. More info in the publishing documentation http://bit.ly/campaign-update.",
    },
  );

  const campaign = migration
    .createContentType('campaign')
    .name('Campaign')
    .description('A DoSomething.org campaign.')
    .displayField('internalTitle');
  campaign
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaign
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: '^[a-zA-Z0-9-]+$',
        },

        message:
          'Only alphanumeric and hyphen characters are allowed in slugs!',
      },
    ])
    .disabled(false)
    .omitted(false);

  campaign
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaign
    .createField('callToAction')
    .name('Call To Action Tagline')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaign
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

  campaign
    .createField('legacyCampaignId')
    .name('Campaign ID')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaign
    .createField('displayReferralPage')
    .name('Display Refer A Friend')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaign
    .createField('campaignSettings')
    .name('Campaign Settings')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['campaignSettings'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  campaign
    .createField('endDate')
    .name('End Date')
    .type('Date')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaign
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
        assetFileSize: {
          max: 20971520,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  campaign
    .createField('blurb')
    .name('Blurb')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaign
    .createField('campaignLead')
    .name('Campaign Lead')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['person'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  campaign
    .createField('affiliateSponsors')
    .name('Affiliate Sponsors')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['affiliates'],
        },
      ],

      linkType: 'Entry',
    });

  campaign
    .createField('affiliatePartners')
    .name('Affiliate Partners')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['affiliates'],
        },
      ],

      linkType: 'Entry',
    });

  campaign
    .createField('affirmation')
    .name('Affirmation')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: [
          'affirmation',
          'linkAction',
          'shareAction',
          'voterRegistrationAction',
        ],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  campaign
    .createField('landingPage')
    .name('Landing Page')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['landingPage'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  campaign
    .createField('pages')
    .name('Pages')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: [
            'campaignUpdate',
            'customBlock',
            'linkAction',
            'page',
            'shareAction',
            'textSubmissionAction',
            'voterRegistrationAction',
          ],
        },
      ],

      linkType: 'Entry',
    });

  campaign
    .createField('quizzes')
    .name('Quizzes')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['quizBeta', 'quiz'],
        },
      ],

      linkType: 'Entry',
    });

  campaign
    .createField('dashboard')
    .name('Dashboard')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['campaignDashboard', 'sixpackExperiment'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  campaign
    .createField('staffPick')
    .name('Staff Pick')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaign
    .createField('cause')
    .name('Cause')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        in: [
          'animals',
          'bullying',
          'disasters',
          'discrimination',
          'education',
          'environment',
          'homelessness',
          'mental health',
          'physical health',
          'poverty',
          'relationships',
          'sex',
          'violence',
        ],
      },
    ])
    .disabled(false)
    .omitted(false);

  campaign
    .createField('scholarshipAmount')
    .name('Scholarship Amount')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaign
    .createField('scholarshipDeadline')
    .name('Scholarship Deadline')
    .type('Date')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaign
    .createField('scholarshipCallToAction')
    .name('Scholarship Call to Action')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaign
    .createField('scholarshipDescription')
    .name('Scholarship Description')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 300,
        },

        message:
          "The scholarship description is limited to 300 characters! This should mirror the description from our partner's site.",
      },
      {
        nodes: {},
      },
      {
        enabledNodeTypes: [
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'hyperlink',
        ],
        message:
          'Only ordered list, unordered list, horizontal rule, quote, and link to Url nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  campaign
    .createField('affiliateOptInContent')
    .name('Affiliate Opt In Content')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 250,
        },

        message: 'Affiliate Opt In Content may not exceed 250 characters.',
      },
      {
        nodes: {},
      },
      {
        enabledMarks: ['bold', 'italic', 'underline'],
        message: 'Only bold, italic, and underline marks are allowed',
      },
      {
        enabledNodeTypes: ['hyperlink'],
        message: 'Only link to Url nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  campaign
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaign.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      '(Example: "Teens for Jeans 2017") This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  campaign.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      '(Example: example-campaign-title) Use hyphens to separate words.',
  });

  campaign.changeFieldControl('title', 'builtin', 'singleLine', {});
  campaign.changeFieldControl('callToAction', 'builtin', 'singleLine', {});
  campaign.changeFieldControl('metadata', 'builtin', 'entryLinkEditor', {});
  campaign.changeFieldControl(
    'legacyCampaignId',
    'extension',
    'contentful-campaign-extension',
    {},
  );

  campaign.changeFieldControl('displayReferralPage', 'builtin', 'boolean', {
    helpText: 'Please do not edit this without support from a product person.',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  campaign.changeFieldControl(
    'campaignSettings',
    'builtin',
    'entryLinkEditor',
    {
      helpText:
        'Configurable settings for a campaign, including Action Text overrides, enabling Sixpack, etc.',
    },
  );

  campaign.changeFieldControl('endDate', 'builtin', 'datePicker', {
    ampm: '12',
    format: 'timeZ',
    helpText:
      "The date the campaign will close. (Confirm that you've set the UTC-04:00 or UTC-05:00 timezones for EST/EDT (https://time.is/compare/UTC)).",
  });

  campaign.changeFieldControl('coverImage', 'builtin', 'assetLinkEditor', {
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  campaign.changeFieldControl('blurb', 'builtin', 'markdown', {
    helpText:
      "Add a short blurb for the lede banner. Bolded items will use the campaign's primary color.",
  });

  campaign.changeFieldControl('campaignLead', 'builtin', 'entryLinkEditor', {});

  campaign.changeFieldControl(
    'affiliateSponsors',
    'builtin',
    'entryLinksEditor',
    {
      helpText:
        'Sponsors are Affiliates that pay for and promote a campaign. They recieve logo top billing at the top of the campaign page. There should usually be just one of these.',
      bulkEditing: false,
    },
  );

  campaign.changeFieldControl(
    'affiliatePartners',
    'builtin',
    'entryLinksEditor',
    {
      helpText:
        "Partners are Affiliates that give us strategic help or resources. They don't require logos and show up at the bottom bar of the campaign page.",
      bulkEditing: false,
    },
  );

  campaign.changeFieldControl('affirmation', 'builtin', 'entryLinkEditor', {
    helpText:
      'If no affirmation added, the affirmation will use default content.',
  });

  campaign.changeFieldControl('landingPage', 'builtin', 'entryLinkEditor', {
    helpText: '',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  campaign.changeFieldControl('pages', 'builtin', 'entryLinksEditor', {
    bulkEditing: false,
  });

  campaign.changeFieldControl('quizzes', 'builtin', 'entryLinksEditor', {
    bulkEditing: false,
  });

  campaign.changeFieldControl('dashboard', 'builtin', 'entryLinkEditor', {});

  campaign.changeFieldControl('staffPick', 'builtin', 'boolean', {
    helpText: 'Is this a Staff Pick campaign?',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  campaign.changeFieldControl('cause', 'builtin', 'radio', {
    helpText: 'Primary cause for this campaign',
  });

  campaign.changeFieldControl('scholarshipAmount', 'builtin', 'numberEditor', {
    helpText: 'e.g. 5000',
  });

  campaign.changeFieldControl('scholarshipDeadline', 'builtin', 'datePicker', {
    ampm: '12',
    format: 'timeZ',
    helpText:
      "Deadline to take action and qualify for the scholarship. (Confirm that you've set the UTC-04:00 or UTC-05:00 timezones for EST/EDT (https://time.is/compare/UTC)).",
  });

  campaign.changeFieldControl(
    'scholarshipCallToAction',
    'builtin',
    'singleLine',
    {
      helpText:
        "This should mirror the language used on the scholarship partner's site e.g. Win An Anti-Vaping Scholarship",
    },
  );

  campaign.changeFieldControl(
    'scholarshipDescription',
    'builtin',
    'richTextEditor',
    {
      helpText:
        "Add information about the scholarship & how it works with the campaign. This should match the description on our partner's site.",
    },
  );

  campaign.changeFieldControl(
    'affiliateOptInContent',
    'builtin',
    'richTextEditor',
    {
      helpText:
        'If there is an affiliate opt in for this campaign, input the informational content to display alongside the opt in checkbox. The affiliate opt in checkbox will only appear if this field is populated.',
    },
  );

  campaign.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );

  const collectionPage = migration
    .createContentType('collectionPage')
    .name('Collection Page')
    .description(
      'A curated collection of content (information, campaigns, articles, reportbacks) related to a central topic or affiliate.',
    )
    .displayField('internalTitle');

  collectionPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  collectionPage
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

  collectionPage
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
            min: 1440,
            max: null,
          },

          height: {
            min: 610,
            max: null,
          },
        },
      },
      {
        assetFileSize: {
          max: 20971520,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  collectionPage
    .createField('superTitle')
    .name('Super Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  collectionPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  collectionPage
    .createField('description')
    .name('Description')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {},
      },
      {
        enabledNodeTypes: [
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'hyperlink',
        ],
        message:
          'Only ordered list, unordered list, horizontal rule, quote, and link to Url nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  collectionPage
    .createField('affiliatePrefix')
    .name('Affiliate Prefix')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  collectionPage
    .createField('affiliates')
    .name('Affiliates')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 0,
          max: 1,
        },

        message:
          'We only support adding one affiliate at the moment. Need more? Hop into #help-product on Slack and chat with us!',
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['affiliates'],
        },
      ],

      linkType: 'Entry',
    });

  collectionPage
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {
          'embedded-entry-block': [
            {
              linkContentType: ['contentBlock', 'galleryBlock'],
            },
          ],
        },
      },
      {
        enabledNodeTypes: [
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'embedded-entry-block',
          'embedded-asset-block',
          'hyperlink',
        ],

        message:
          'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, and link to Url nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  collectionPage
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  collectionPage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  collectionPage.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'e.g. "boosomething-halloween". The URL for the Collection Page will be prefixed with "collections/" e.g. "https://dosomething.org/us/collections/boosomething-halloween".',
  });

  collectionPage.changeFieldControl(
    'coverImage',
    'builtin',
    'assetLinkEditor',
    {
      helpText:
        'The cover image is used as the background for the banner of the Collection Page.',
    },
  );

  collectionPage.changeFieldControl('superTitle', 'builtin', 'singleLine', {
    helpText:
      'Shows up atop the title in the banner (can be used as a nice prefix to the title) e.g. "Let\'s affect a more positive".',
  });

  collectionPage.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'The great big title in the banner e.g. "Halloween"',
  });

  collectionPage.changeFieldControl(
    'description',
    'builtin',
    'richTextEditor',
    {
      helpText:
        'Sits in the banner below the title, provides some general information / introduction to the collection page',
    },
  );

  collectionPage.changeFieldControl(
    'affiliatePrefix',
    'builtin',
    'singleLine',
    {
      helpText:
        '*If* there are affiliates for this Collection Page, add a custom prefix for how they\'re introduced -- this text will display atop the logo at the foot of the banner. E.g. "Sponsored By", defaults to "In Partnership With".',
    },
  );

  collectionPage.changeFieldControl(
    'affiliates',
    'builtin',
    'entryLinksEditor',
    {
      helpText:
        'The affiliate partner or sponsor associated with this Collections Page. Their logo will appear at the foot of the banner, prefixed with the Affiliate Prefix field content.',
      bulkEditing: false,
    },
  );

  collectionPage.changeFieldControl('content', 'builtin', 'richTextEditor', {
    helpText:
      'The core content for this collection page, sits below the banner, optimally a collection of galleries e.g. campaigns & articles related to this topic.',
  });

  collectionPage.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );

  const voterRegistrationReferralsBlock = migration
    .createContentType('voterRegistrationReferralsBlock')
    .name('Voter Registration Referrals Block')
    .description(
      "Displays current user's number of completed voter registration referrals.",
    )
    .displayField('internalTitle');

  voterRegistrationReferralsBlock
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

  voterRegistrationReferralsBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  voterRegistrationReferralsBlock.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );
  voterRegistrationReferralsBlock.changeFieldControl(
    'title',
    'builtin',
    'singleLine',
    {},
  );
  const callToAction = migration
    .createContentType('callToAction')
    .name('Call To Action')
    .description(
      'Customizable call to actions components in a campaign or page.',
    )
    .displayField('internalTitle');
  callToAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  callToAction
    .createField('superTitle')
    .name('Supertitle')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 60,
        },

        message: 'Please use less than 60 characters',
      },
    ])
    .disabled(false)
    .omitted(false);

  callToAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          max: 60,
        },

        message: 'Please use less than 60 characters',
      },
    ])
    .disabled(false)
    .omitted(false);

  callToAction
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 210,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  callToAction
    .createField('linkText')
    .name('Link Text')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          max: 30,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  callToAction
    .createField('link')
    .name('Link Location')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        regexp: {
          pattern:
            '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
        },

        message: 'Please provide a valid URL',
      },
    ])
    .disabled(false)
    .omitted(false);

  callToAction
    .createField('template')
    .name('Template')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        in: ['Purple', 'Yellow', 'Voter Registration'],
      },
    ])
    .disabled(false)
    .omitted(false);

  callToAction
    .createField('alignment')
    .name('Alignment')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        in: ['Left', 'Center'],
      },
    ])
    .disabled(false)
    .omitted(false);

  callToAction.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  callToAction.changeFieldControl('superTitle', 'builtin', 'singleLine', {
    helpText: 'This text will appear in a small font above the main title',
  });

  callToAction.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'This is the largest text title of the CTA',
  });

  callToAction.changeFieldControl('content', 'builtin', 'multipleLine', {});
  callToAction.changeFieldControl('linkText', 'builtin', 'singleLine', {});

  callToAction.changeFieldControl('link', 'builtin', 'urlEditor', {
    helpText: 'This is what the button of your CTA will link to',
  });

  callToAction.changeFieldControl('template', 'builtin', 'dropdown', {
    helpText: 'This will set the color scheme of your CTA',
  });

  callToAction.changeFieldControl('alignment', 'builtin', 'radio', {
    helpText:
      'This will align the whole CTA to the left rail or center the content',
  });

  const landingPage = migration
    .createContentType('landingPage')
    .name('Landing Page')
    .description('A custom landing page for a DoSomething.org campaign.')
    .displayField('internalTitle');
  landingPage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  landingPage
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([
      {
        nodes: {
          'entry-hyperlink': [
            {
              linkContentType: ['contentBlock', 'imagesBlock', 'linkAction'],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  landingPage
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  landingPage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  landingPage.changeFieldControl('content', 'builtin', 'richTextEditor', {});

  landingPage.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {
      helpText: 'Only used for legacy template',
    },
  );

  const quiz = migration
    .createContentType('quiz')
    .name('Quiz')
    .description('Models a (BuzzFeed style) results oriented quiz')
    .displayField('internalTitle');
  quiz
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  quiz
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  quiz
    .createField('slug')
    .name('Slug')
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

  quiz
    .createField('campaignId')
    .name('Campaign ID')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  quiz
    .createField('autoSubmit')
    .name('Auto Submit Quiz')
    .type('Boolean')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  quiz
    .createField('hideQuestionNumber')
    .name('Hide Question Number')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  quiz
    .createField('results')
    .name('Results')
    .type('Object')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  quiz
    .createField('resultBlocks')
    .name('Result Blocks')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['linkAction', 'quiz', 'shareAction'],
        },
      ],

      linkType: 'Entry',
    });

  quiz
    .createField('defaultResultBlock')
    .name('Default Result Block')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['shareAction', 'linkAction', 'quiz'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  quiz
    .createField('questions')
    .name('Questions')
    .type('Object')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  quiz
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  quiz.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  quiz.changeFieldControl('title', 'builtin', 'singleLine', {});
  quiz.changeFieldControl('slug', 'builtin', 'singleLine', {});
  quiz.changeFieldControl(
    'campaignId',
    'extension',
    'contentful-campaign-extension',
    {},
  );
  quiz.changeFieldControl('autoSubmit', 'builtin', 'boolean', {});

  quiz.changeFieldControl('hideQuestionNumber', 'builtin', 'boolean', {
    helpText: 'Hide pre-titles (i.e. "Question One") from all Quiz questions',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  quiz.changeFieldControl(
    'results',
    'extension',
    'json-form-editor-extension',
    {},
  );

  quiz.changeFieldControl('resultBlocks', 'builtin', 'entryLinksEditor', {
    helpText:
      'The result content can show up within a specified Block. You can configure which Result Block should appear based on user choices in the Choices fields',
    bulkEditing: false,
  });

  quiz.changeFieldControl(
    'defaultResultBlock',
    'builtin',
    'entryLinkEditor',
    {},
  );
  quiz.changeFieldControl(
    'questions',
    'extension',
    'json-form-editor-extension',
    {},
  );
  quiz.changeFieldControl('additionalContent', 'builtin', 'objectEditor', {});

  const currentSchoolBlock = migration
    .createContentType('currentSchoolBlock')
    .name('Current School Block')
    .description(
      "Displays the user's current school, or allows them to select it if not set.",
    )
    .displayField('internalTitle');

  currentSchoolBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('selectSchoolTitle')
    .name('Select School Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('selectSchoolDescription')
    .name('Select School Description')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('currentSchoolTitle')
    .name('Current School Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('currentSchoolDescription')
    .name('Current School Description')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  currentSchoolBlock
    .createField('schoolNotAvailableDescription')
    .name('School Not Available Description')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  currentSchoolBlock.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
    },
  );

  currentSchoolBlock.changeFieldControl('actionId', 'builtin', 'numberEditor', {
    helpText: "If set, displays the current school's aggregate impact",
  });

  currentSchoolBlock.changeFieldControl(
    'selectSchoolTitle',
    'builtin',
    'singleLine',
    {
      helpText: 'Defaults to "Find Your School" if blank',
    },
  );

  currentSchoolBlock.changeFieldControl(
    'selectSchoolDescription',
    'builtin',
    'markdown',
    {},
  );

  currentSchoolBlock.changeFieldControl(
    'currentSchoolTitle',
    'builtin',
    'singleLine',
    {
      helpText: 'Defaults to "Your School" if blank',
    },
  );

  currentSchoolBlock.changeFieldControl(
    'currentSchoolDescription',
    'builtin',
    'markdown',
    {},
  );

  currentSchoolBlock.changeFieldControl(
    'schoolNotAvailableDescription',
    'builtin',
    'markdown',
    {
      helpText:
        'Displayed when user has selected that they cannot find their school',
    },
  );

  const causePage = migration
    .createContentType('causePage')
    .name('Cause Page')
    .description(
      'A collection of content (information, campaigns, articles, reportbacks) revolving around a particular cause space',
    )
    .displayField('internalTitle');

  causePage
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  causePage
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

  causePage
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
            min: 1440,
            max: null,
          },

          height: {
            min: 610,
            max: null,
          },
        },
      },
      {
        assetFileSize: {
          max: 20971520,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  causePage
    .createField('superTitle')
    .name('Super Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  causePage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  causePage
    .createField('description')
    .name('Description')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {},
      },
      {
        enabledNodeTypes: [
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'hyperlink',
        ],
        message:
          'Only ordered list, unordered list, horizontal rule, quote, and link to Url nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  causePage
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {
          'embedded-entry-block': [
            {
              linkContentType: ['contentBlock', 'galleryBlock'],
            },
          ],
        },
      },
      {
        enabledNodeTypes: [
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'embedded-entry-block',
          'embedded-asset-block',
          'hyperlink',
        ],

        message:
          'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, and link to Url nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  causePage
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  causePage.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  causePage.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'Slug should match the cause type e.g. "environment". The URL for the Cause Page will be prefixed with "causes/" e.g. "https://dosomething.org/us/causes/environment".',
  });

  causePage.changeFieldControl('coverImage', 'builtin', 'assetLinkEditor', {
    helpText:
      'The cover image is used as the background for the banner of the Cause Page.',
  });

  causePage.changeFieldControl('superTitle', 'builtin', 'singleLine', {
    helpText:
      'Shows up atop the title in the banner (can be used as a nice prefix to the title) e.g. "Let\'s do something about the".',
  });

  causePage.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'The great big title in the banner e.g. "Environment"',
  });

  causePage.changeFieldControl('description', 'builtin', 'richTextEditor', {
    helpText:
      'Sits in the banner below the title, provides some general information / introduction to the cause space',
  });

  causePage.changeFieldControl('content', 'builtin', 'richTextEditor', {
    helpText:
      'The core content for this cause page, sits below the banner, optimally a collection of galleries e.g. campaigns & articles related to this cause space',
  });

  causePage.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );

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
  contentBlock.changeFieldControl('subTitle', 'builtin', 'singleLine', {});
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

  const softEdgeWidgetAction = migration
    .createContentType('softEdgeWidgetAction')
    .name('SoftEdgeWidgetAction')
    .description(
      'Actions made via our third party partner, SoftEdge. This can be an email, Tweet, Facebook post, call, etc. to specific targets. ',
    )
    .displayField('internalTitle');

  softEdgeWidgetAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  softEdgeWidgetAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 65,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  softEdgeWidgetAction
    .createField('softEdgeId')
    .name('SoftEdge ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  softEdgeWidgetAction
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  softEdgeWidgetAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'This is for our internal Contentful organization and will be how the block shows up in search results, etc. It should include the Year-Month and a distinctive title to help find this content in the system.',
    },
  );

  softEdgeWidgetAction.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText:
      'This will be displayed as the header within the SoftEdge widget action block.',
  });

  softEdgeWidgetAction.changeFieldControl(
    'softEdgeId',
    'builtin',
    'numberEditor',
    {
      helpText:
        'The ID of the SoftEdge action, given upon creation in SoftEdge. When you click "Publish Now", a URL will appear in the "See the Action" box. The SoftEdge ID is the last digit in the URL. e.g. SoftEdge ID = 3 in http://www.congressweb.com/dosomething/3',
    },
  );

  softEdgeWidgetAction.changeFieldControl(
    'actionId',
    'builtin',
    'numberEditor',
    {
      helpText: 'The Action ID associated with this action in Rogue.',
    },
  );

  const campaignDashboard = migration
    .createContentType('campaignDashboard')
    .name('Campaign Dashboard')
    .description(
      'Provide quick data points and descriptions for a campaign via a dashboard.',
    )
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
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignDashboard
    .createField('shareCopy')
    .name('Share Copy')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignDashboard
    .createField('firstValue')
    .name('First Value')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignDashboard
    .createField('firstDescription')
    .name('First Description')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignDashboard
    .createField('secondValue')
    .name('Second Value')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignDashboard
    .createField('secondDescription')
    .name('Second Description')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaignDashboard.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
    },
  );

  campaignDashboard.changeFieldControl('shareHeader', 'builtin', 'singleLine', {
    helpText:
      'Something encouraging you to share the campaign, eg: "Share this campaign".',
  });

  campaignDashboard.changeFieldControl('shareCopy', 'builtin', 'singleLine', {
    helpText:
      'Something encouraging you to share the campaign, eg: "Every share can...".',
  });

  campaignDashboard.changeFieldControl('firstValue', 'builtin', 'singleLine', {
    helpText:
      'The first dashboard value presented, this should probably be a bold number.',
  });

  campaignDashboard.changeFieldControl(
    'firstDescription',
    'builtin',
    'singleLine',
    {
      helpText:
        'The description that follows the first dashboard value presented; this should give context to the value.',
    },
  );

  campaignDashboard.changeFieldControl('secondValue', 'builtin', 'singleLine', {
    helpText:
      'The second dashboard value presented, this should probably be a bold number.',
  });

  campaignDashboard.changeFieldControl(
    'secondDescription',
    'builtin',
    'singleLine',
    {
      helpText:
        'The description that follows the second dashboard value presented; this should give context to the value.',
    },
  );

  const selectionSubmissionAction = migration
    .createContentType('selectionSubmissionAction')
    .name('SelectionSubmissionAction')
    .description('')
    .displayField('internalTitle');
  selectionSubmissionAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  selectionSubmissionAction
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 65,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {},
      },
      {
        enabledNodeTypes: [
          'blockquote',
          'unordered-list',
          'ordered-list',
          'hyperlink',
          'hr',
          'heading-6',
          'heading-5',
          'heading-4',
          'heading-3',
        ],

        message:
          'Only quote, unordered list, ordered list, link to Url, horizontal rule, heading 6, heading 5, heading 4, and heading 3 nodes are allowed',
      },
    ])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('selectionFieldLabel')
    .name('Selection Field Label')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('selectionOptions')
    .name('Selection Options')
    .type('Array')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Symbol',
      validations: [],
    });

  selectionSubmissionAction
    .createField('selectionPlaceholderOption')
    .name('Selection Placeholder Option')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 25,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction
    .createField('postSubmissionLabel')
    .name('Post Submission Label')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  selectionSubmissionAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText: 'This title is used internally to help find this content.',
    },
  );

  selectionSubmissionAction.changeFieldControl(
    'actionId',
    'builtin',
    'numberEditor',
    {
      helpText:
        'The Action ID associated with this action. Action IDs can be found in Rogue: https://dosome.click/nyshrf',
    },
  );

  selectionSubmissionAction.changeFieldControl(
    'title',
    'builtin',
    'singleLine',
    {
      helpText:
        'The title for the selection block. (Defaults to "Make a selection").',
    },
  );

  selectionSubmissionAction.changeFieldControl(
    'content',
    'builtin',
    'richTextEditor',
    {
      helpText: 'The content displayed in the submission block.',
    },
  );

  selectionSubmissionAction.changeFieldControl(
    'selectionFieldLabel',
    'builtin',
    'singleLine',
    {
      helpText:
        'The label displayed above the selection field. (Defaults to "Select one of the options below").',
    },
  );

  selectionSubmissionAction.changeFieldControl(
    'selectionOptions',
    'builtin',
    'listInput',
    {
      helpText:
        'The selection options for the selection block. Insert comma separated values.',
    },
  );

  selectionSubmissionAction.changeFieldControl(
    'selectionPlaceholderOption',
    'builtin',
    'singleLine',
    {
      helpText:
        'The placeholder selection value. This will not be a valid selection. (Defaults to "---").',
    },
  );

  selectionSubmissionAction.changeFieldControl(
    'buttonText',
    'builtin',
    'singleLine',
    {
      helpText:
        'Text to display on the submission button (defaults to "Submit").',
    },
  );

  selectionSubmissionAction.changeFieldControl(
    'postSubmissionLabel',
    'builtin',
    'singleLine',
    {
      helpText: 'The text displayed under the user selection, post submission.',
    },
  );

  const sixpackExperiment = migration
    .createContentType('sixpackExperiment')
    .name('Sixpack Experiment')
    .description('Used to help set up A/B testing experiments.')
    .displayField('internalTitle');

  sixpackExperiment
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

  sixpackExperiment
    .createField('control')
    .name('Test Control')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  sixpackExperiment
    .createField('alternatives')
    .name('Test Alternatives')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          min: 1,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [],
      linkType: 'Entry',
    });

  sixpackExperiment
    .createField('convertableActions')
    .name('Actions To Convert Experiment')
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
          in: ['signup', 'reportbackPost'],
        },
      ],
    });

  sixpackExperiment
    .createField('trafficFraction')
    .name('Traffic Fraction')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([
      {
        range: {
          min: 1,
          max: 100,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  sixpackExperiment
    .createField('kpi')
    .name('Key Performance Indicator (KPI)')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  sixpackExperiment.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'Used as the title of the Sixpack Experiment; try to keep it short but make it descriptive to distinguish between other experiments.',
    },
  );

  sixpackExperiment.changeFieldControl(
    'control',
    'builtin',
    'entryLinkEditor',
    {
      helpText:
        'Link the default test (the control in the experiment) here. If running a test to compare the absence of a block versus the presence of a block, leave this field empty and it will behave as the "absent block".',
    },
  );

  sixpackExperiment.changeFieldControl(
    'alternatives',
    'builtin',
    'entryLinksEditor',
    {
      helpText: 'Add one or more test alternative block variants here.',
      bulkEditing: false,
    },
  );

  sixpackExperiment.changeFieldControl(
    'convertableActions',
    'builtin',
    'checkbox',
    {
      helpText:
        'Specify what actions will count towards converting the user on the experiment.',
    },
  );

  sixpackExperiment.changeFieldControl(
    'trafficFraction',
    'builtin',
    'numberEditor',
    {
      helpText:
        'Specify the percent of traffic to run the experiment on. Defaults to 100%.',
    },
  );

  sixpackExperiment.changeFieldControl('kpi', 'builtin', 'singleLine', {
    helpText:
      'Specify a KPI to associate with this experiment in the Sixpack Web Administrative interface.',
  });

  const affiliates = migration
    .createContentType('affiliates')
    .name('Affiliates')
    .description(
      'Sponsors, partners, or other third-party affiliates for a campaign.',
    )
    .displayField('internalTitle');
  affiliates
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  affiliates
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  affiliates
    .createField('link')
    .name('Link')
    .type('Symbol')
    .localized(false)
    .required(false)
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

  affiliates
    .createField('logo')
    .name('Logo')
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

  affiliates
    .createField('utmLabel')
    .name('UTM Label')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        unique: true,
      },
      {
        size: {
          max: 50,
        },

        message: 'The UTM Label field may not exceed 50 characters.',
      },
      {
        regexp: {
          pattern: '^[a-zA-Z0-9_]*$',
          flags: null,
        },

        message:
          'The UTM Label field can only contain lower case letters or numbers and must be snake cased (http://bit.ly/2Pxkxv9).',
      },
    ])
    .disabled(false)
    .omitted(false);

  affiliates.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  affiliates.changeFieldControl('title', 'builtin', 'singleLine', {});
  affiliates.changeFieldControl('link', 'builtin', 'urlEditor', {});
  affiliates.changeFieldControl('logo', 'builtin', 'assetLinkEditor', {});

  affiliates.changeFieldControl('utmLabel', 'builtin', 'singleLine', {
    helpText:
      'The UTM parameter label identifying this affiliate. (Primarily used to identify referring scholarship affiliate partners).',
  });

  const person = migration
    .createContentType('person')
    .name('Person')
    .description('A person employed or associated with DoSomething.org.')
    .displayField('name');

  person
    .createField('name')
    .name('Name')
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

  person
    .createField('type')
    .name('Type')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([
      {
        in: [
          'staff',
          'intern',
          'contributor',
          'member',
          'board member',
          'advisory board member',
        ],
      },
    ])
    .disabled(false)
    .omitted(false);

  person
    .createField('active')
    .name('Active')
    .type('Boolean')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  person
    .createField('jobTitle')
    .name('Job Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  person
    .createField('email')
    .name('Email')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: '^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$',
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  person
    .createField('twitterId')
    .name('Twitter ID')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: '^[^@]\\w{1,15}$',
        },

        message: 'Please enter a valid Twitter handle, excluding the @ symbol.',
      },
    ])
    .disabled(false)
    .omitted(false);

  person
    .createField('photo')
    .name('Photo')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');
  person
    .createField('alternatePhoto')
    .name('Alternate Photo')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');
  person
    .createField('description')
    .name('Description')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  person.changeFieldControl('name', 'builtin', 'singleLine', {});
  person.changeFieldControl('type', 'builtin', 'radio', {});
  person.changeFieldControl('active', 'builtin', 'boolean', {});
  person.changeFieldControl('jobTitle', 'builtin', 'singleLine', {});
  person.changeFieldControl('email', 'builtin', 'singleLine', {});
  person.changeFieldControl('twitterId', 'builtin', 'singleLine', {});
  person.changeFieldControl('photo', 'builtin', 'assetLinkEditor', {});
  person.changeFieldControl('alternatePhoto', 'builtin', 'assetLinkEditor', {});
  person.changeFieldControl('description', 'builtin', 'markdown', {});
  const postGallery = migration
    .createContentType('postGallery')
    .name('Post Gallery')
    .description('A gallery of user-submitted posts.')
    .displayField('internalTitle');
  postGallery
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  postGallery
    .createField('actionIds')
    .name('Action IDs')
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
          regexp: {
            pattern: '[0-9]+',
            flags: null,
          },

          message: 'This must be a numeric Action ID.',
        },
      ],
    });

  postGallery
    .createField('itemsPerRow')
    .name('Items Per Row')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        in: [2, 3],
      },
    ])
    .disabled(false)
    .omitted(false);

  postGallery
    .createField('filterType')
    .name('Filter Type')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        in: ['location', 'none'],
      },
    ])
    .disabled(false)
    .omitted(false);

  postGallery
    .createField('hideReactions')
    .name('Hide Reactions')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  postGallery.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});

  postGallery.changeFieldControl('actionIds', 'builtin', 'listInput', {
    helpText:
      'A comma-separated list of one or more Action IDs to display in this gallery. Action IDs\n    can be found in Rogue: https://dosome.click/nyshrf',
  });

  postGallery.changeFieldControl('itemsPerRow', 'builtin', 'radio', {
    helpText:
      'The maximum number of items in a single row when viewing the gallery in a large display.',
  });

  postGallery.changeFieldControl('filterType', 'builtin', 'radio', {
    helpText: 'Allow filtering user-submitted posts by a specified type.',
  });

  postGallery.changeFieldControl('hideReactions', 'builtin', 'boolean', {
    helpText: 'Hide the post reactions for this gallery.',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  const textSubmissionAction = migration
    .createContentType('textSubmissionAction')
    .name('Text Submission Action')
    .description('Action block for submitting text reportback posts.')
    .displayField('internalTitle');
  textSubmissionAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  textSubmissionAction
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  textSubmissionAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 65,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  textSubmissionAction
    .createField('textFieldLabel')
    .name('Text Field Label')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  textSubmissionAction
    .createField('textFieldPlaceholder')
    .name('Text Field Placeholder Message')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  textSubmissionAction
    .createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 25,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  textSubmissionAction
    .createField('informationTitle')
    .name('Information Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  textSubmissionAction
    .createField('informationContent')
    .name('Information Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  textSubmissionAction
    .createField('affirmationContent')
    .name('Affirmation Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  textSubmissionAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  textSubmissionAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );

  textSubmissionAction.changeFieldControl(
    'actionId',
    'builtin',
    'numberEditor',
    {
      helpText: 'The Action ID associated with this action in Rogue.',
    },
  );

  textSubmissionAction.changeFieldControl('title', 'builtin', 'singleLine', {});

  textSubmissionAction.changeFieldControl(
    'textFieldLabel',
    'builtin',
    'singleLine',
    {
      helpText:
        'The label for the "text" field, helping describe or prompt the user regarding what to submit.',
    },
  );

  textSubmissionAction.changeFieldControl(
    'textFieldPlaceholder',
    'builtin',
    'singleLine',
    {
      helpText:
        'The placeholder for the "text" field, providing an example of what a text submission should look like.',
    },
  );

  textSubmissionAction.changeFieldControl(
    'buttonText',
    'builtin',
    'singleLine',
    {},
  );

  textSubmissionAction.changeFieldControl(
    'informationTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'Title to display for the information block (defaults to "More Info").',
    },
  );

  textSubmissionAction.changeFieldControl(
    'informationContent',
    'builtin',
    'markdown',
    {
      helpText:
        'Content to display for the information block (this block will be hidden by default unless content is provided).',
    },
  );

  textSubmissionAction.changeFieldControl(
    'affirmationContent',
    'builtin',
    'markdown',
    {},
  );
  textSubmissionAction.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );

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
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

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
  shareAction.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});

  shareAction.changeFieldControl('actionId', 'builtin', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue.',
  });

  shareAction.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Eg: "Share this link"',
  });

  shareAction.changeFieldControl('socialPlatform', 'builtin', 'checkbox', {
    helpText:
      "Select the social platform to be used by the Share Action's share button. (Limited to Facebook or Twitter).",
  });

  shareAction.changeFieldControl('content', 'builtin', 'markdown', {
    helpText: 'Descriptive content for the share action',
  });

  shareAction.changeFieldControl('link', 'builtin', 'singleLine', {
    helpText: 'Link to be shared',
  });

  shareAction.changeFieldControl('hideEmbed', 'builtin', 'boolean', {
    helpText: 'This will hide the link preview "embed" on the share action.',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  shareAction.changeFieldControl(
    'affirmationBlock',
    'builtin',
    'entryLinkEditor',
    {
      helpText:
        'This block will be displayed in a modal after a successful share. It may be used to thank the user or prompt them to complete another action.',
    },
  );

  shareAction.changeFieldControl('affirmation', 'builtin', 'markdown', {
    helpText:
      'A quick text-only affirmation message. If an affirmation block is set (above), this will be ignored!',
  });

  shareAction.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {
      helpText: '',
    },
  );

  const petitionSubmissionAction = migration
    .createContentType('petitionSubmissionAction')
    .name('Petition Submission Action')
    .description('Action block for submitting petition reportback posts.')
    .displayField('internalTitle');
  petitionSubmissionAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
    .createField('actionId')
    .name('Action ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 65,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  petitionSubmissionAction
    .createField('textFieldPlaceholder')
    .name('Text Field Placeholder Message')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
    .createField('buttonText')
    .name('Button Text')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 25,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  petitionSubmissionAction
    .createField('informationTitle')
    .name('Information Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  petitionSubmissionAction
    .createField('informationContent')
    .name('Information Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  petitionSubmissionAction
    .createField('affirmationContent')
    .name('Affirmation Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  petitionSubmissionAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  petitionSubmissionAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );

  petitionSubmissionAction.changeFieldControl(
    'actionId',
    'builtin',
    'numberEditor',
    {
      helpText: 'The Action ID associated with this action in Rogue.',
    },
  );

  petitionSubmissionAction.changeFieldControl(
    'title',
    'builtin',
    'singleLine',
    {
      helpText:
        'The title of the petition block (defaults to "Sign The Petition").',
    },
  );

  petitionSubmissionAction.changeFieldControl(
    'content',
    'builtin',
    'markdown',
    {
      helpText: "The petition's content.",
    },
  );

  petitionSubmissionAction.changeFieldControl(
    'textFieldPlaceholder',
    'builtin',
    'singleLine',
    {
      helpText:
        'The placeholder for the "custom message" text field (defaults to "Add your custom message...").',
    },
  );

  petitionSubmissionAction.changeFieldControl(
    'buttonText',
    'builtin',
    'singleLine',
    {
      helpText:
        'Text to display on the submission button (defaults to "Add your name").',
    },
  );

  petitionSubmissionAction.changeFieldControl(
    'informationTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'Title to display for the information block (defaults to "More Info").',
    },
  );

  petitionSubmissionAction.changeFieldControl(
    'informationContent',
    'builtin',
    'markdown',
    {
      helpText:
        'Content to display for the information block (defaults to basic information regarding what happens with user\'s signature").',
    },
  );

  petitionSubmissionAction.changeFieldControl(
    'affirmationContent',
    'builtin',
    'markdown',
    {
      helpText:
        'Content to display once the user successfully submits their petition reportback (defaults to a generic thank you message).',
    },
  );

  petitionSubmissionAction.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );

  const metadata = migration
    .createContentType('metadata')
    .name('Metadata')
    .description(
      'Metadata for a campaign or page to help with SEO and sharing on social platforms.',
    )
    .displayField('internalTitle');

  metadata
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  metadata
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  metadata
    .createField('description')
    .name('Description')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 160,
        },

        message:
          'Recommended to keep this text under 160 characters to help with SEO.',
      },
    ])
    .disabled(false)
    .omitted(false);

  metadata
    .createField('image')
    .name('Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
      {
        assetImageDimensions: {
          width: {
            min: 600,
            max: null,
          },

          height: {
            min: 600,
            max: null,
          },
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  metadata.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  metadata.changeFieldControl('title', 'builtin', 'singleLine', {});
  metadata.changeFieldControl('description', 'builtin', 'multipleLine', {});

  metadata.changeFieldControl('image', 'builtin', 'assetLinkEditor', {
    helpText:
      'Recommended image dimensions is 1200 x 1200 pixels with the subject centered. Facebook will crop the top and bottom of the image.',
  });

  const affirmation = migration
    .createContentType('affirmation')
    .name('Affirmation')
    .description('What the user sees post-signup!')
    .displayField('header');
  affirmation
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  affirmation
    .createField('header')
    .name('Header')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  affirmation
    .createField('photo')
    .name('Photo')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(true)
    .omitted(false)
    .linkType('Asset');
  affirmation
    .createField('quote')
    .name('Quote')
    .type('Text')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  affirmation
    .createField('newAuthor')
    .name('Author')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['person'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  affirmation
    .createField('callToActionHeader')
    .name('Call to Action Header')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  affirmation
    .createField('callToActionDescription')
    .name('Call to Action Description')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  affirmation
    .createField('author')
    .name('Legacy Author')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(true)
    .omitted(false);

  affirmation.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  affirmation.changeFieldControl('header', 'builtin', 'singleLine', {});
  affirmation.changeFieldControl('photo', 'builtin', 'assetLinkEditor', {});
  affirmation.changeFieldControl('quote', 'builtin', 'markdown', {});
  affirmation.changeFieldControl('newAuthor', 'builtin', 'entryLinkEditor', {});
  affirmation.changeFieldControl(
    'callToActionHeader',
    'builtin',
    'singleLine',
    {},
  );
  affirmation.changeFieldControl(
    'callToActionDescription',
    'builtin',
    'singleLine',
    {},
  );
  affirmation.changeFieldControl('author', 'builtin', 'singleLine', {});
  const cardBlock = migration
    .createContentType('cardBlock')
    .name('Card Block')
    .description('Text content, displayed within a "card" container.')
    .displayField('internalTitle');
  cardBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  cardBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  cardBlock
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  cardBlock
    .createField('link')
    .name('Link')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  cardBlock
    .createField('author')
    .name('Author')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');
  cardBlock
    .createField('metadata')
    .name('Metadata')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');
  cardBlock.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  cardBlock.changeFieldControl('title', 'builtin', 'singleLine', {});
  cardBlock.changeFieldControl('content', 'builtin', 'markdown', {});
  cardBlock.changeFieldControl('link', 'builtin', 'singleLine', {});
  cardBlock.changeFieldControl('author', 'builtin', 'entryLinkEditor', {});
  cardBlock.changeFieldControl('metadata', 'builtin', 'entryLinkEditor', {});
  const customBlock = migration
    .createContentType('customBlock')
    .name('Custom Block')
    .description(
      'This is a custom block, for experimental or one-off features.',
    )
    .displayField('title');
  customBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  customBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  customBlock
    .createField('type')
    .name('Block Type')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['gallery', 'static', 'poll_locator', 'join_cta'],
      },
    ])
    .disabled(false)
    .omitted(false);

  customBlock
    .createField('displayOptions')
    .name('Display Options')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 1,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Symbol',

      validations: [
        {
          in: ['one-third', 'half', 'two-thirds', 'full'],
        },
      ],
    });

  customBlock
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  customBlock
    .createField('link')
    .name('Link')
    .type('Symbol')
    .localized(false)
    .required(false)
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

  customBlock
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  customBlock.changeFieldControl('internalTitle', 'builtin', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  customBlock.changeFieldControl('title', 'builtin', 'singleLine', {});
  customBlock.changeFieldControl('type', 'builtin', 'radio', {});
  customBlock.changeFieldControl('displayOptions', 'builtin', 'checkbox', {});
  customBlock.changeFieldControl('content', 'builtin', 'markdown', {});
  customBlock.changeFieldControl('link', 'builtin', 'urlEditor', {});
  customBlock.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );
  const imagesBlock = migration
    .createContentType('imagesBlock')
    .name('Images Block')
    .description('A block of images')
    .displayField('internalTitle');
  imagesBlock
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  imagesBlock
    .createField('images')
    .name('Images')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkMimetypeGroup: ['image'],
        },
      ],

      linkType: 'Asset',
    });

  imagesBlock.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  imagesBlock.changeFieldControl('images', 'builtin', 'assetLinksEditor', {});

  const voterRegistrationAction = migration
    .createContentType('voterRegistrationAction')
    .name('Voter Registration Action')
    .description(
      'For information on how to use this component, go to http://bit.ly/voter-registration-action',
    )
    .displayField('internalTitle');

  voterRegistrationAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  voterRegistrationAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  voterRegistrationAction
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  voterRegistrationAction
    .createField('link')
    .name('Link')
    .type('Symbol')
    .localized(false)
    .required(false)
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

  voterRegistrationAction
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  voterRegistrationAction.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {},
  );

  voterRegistrationAction.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Eg: "Register To Vote!"',
  });

  voterRegistrationAction.changeFieldControl(
    'content',
    'builtin',
    'markdown',
    {},
  );

  voterRegistrationAction.changeFieldControl('link', 'builtin', 'singleLine', {
    helpText:
      'For instructions, refer to: http://bit.ly/voter-registration-action',
  });

  voterRegistrationAction.changeFieldControl(
    'additionalContent',
    'builtin',
    'objectEditor',
    {},
  );
  const campaignSettings = migration
    .createContentType('campaignSettings')
    .name('Campaign Settings')
    .description('Campaign configuration settings')
    .displayField('internalTitle');
  campaignSettings
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  campaignSettings
    .createField('allowExperiments')
    .name('Allow Sixpack A/B Test Experiments')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  campaignSettings
    .createField('actionText')
    .name('Action Text')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 1,
          max: 20,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  campaignSettings.changeFieldControl(
    'internalTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        '(Example: "Teens for Jeans 2017 Settings") Add the campaign title, year and append "Settings" for the full internal title.',
    },
  );

  campaignSettings.changeFieldControl(
    'allowExperiments',
    'builtin',
    'boolean',
    {
      helpText:
        'Designate whether this campaign can partake in A/B test experiments.',
      trueLabel: 'Yes',
      falseLabel: 'No',
    },
  );

  campaignSettings.changeFieldControl('actionText', 'builtin', 'singleLine', {
    helpText:
      'Button action text (e.g. "Sign up") for all buttons (CTA\'s Sign Up buttons etc.) within this campaign. Defaults to "Join us" if left empty. Can be overridden for specific CTA\'s within their settings.',
  });

  const socialOverride = migration
    .createContentType('socialOverride')
    .name('Social Overrides')
    .description('Fields for social shares')
    .displayField('title');
  socialOverride
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  socialOverride
    .createField('callToAction')
    .name('Call To Action')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  socialOverride
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  socialOverride
    .createField('quote')
    .name('Quote')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 497,
        },

        message: 'Facebook only supports 497 chars!',
      },
    ])
    .disabled(false)
    .omitted(false);

  socialOverride.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Large header that displays in the card',
  });

  socialOverride.changeFieldControl('callToAction', 'builtin', 'singleLine', {
    helpText: 'Smaller text that displays under the title',
  });

  socialOverride.changeFieldControl(
    'coverImage',
    'builtin',
    'assetLinkEditor',
    {
      helpText: 'Image that displays in the card',
    },
  );

  socialOverride.changeFieldControl('quote', 'builtin', 'markdown', {
    helpText:
      'Facebook specific field which displays above the card as quoted text',
  });
};
