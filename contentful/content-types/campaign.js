module.exports = function(migration) {
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
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
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
    .createField('template')
    .name('Template')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 1,
        },

        message: 'Only choose one template.',
      },
    ])
    .disabled(true)
    .omitted(false)
    .items({
      type: 'Symbol',

      validations: [
        {
          in: ['legacy', 'mosaic'],
        },
      ],
    });

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
    .createField('callToAction')
    .name('Call To Action Tagline')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
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
    .createField('socialOverride')
    .name('Social Override')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['socialOverride'],
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
        linkContentType: ['landingPage', 'sixpackExperiment'],
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
          "Keep it short and sweet! This should mirror the description from our partner's site.",
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
          'embedded-entry-block',
          'embedded-asset-block',
          'hyperlink',
          'entry-hyperlink',
          'asset-hyperlink',
          'embedded-entry-inline',
        ],

        message:
          'Only ordered list, unordered list, horizontal rule, quote, block entry, asset, link to Url, link to entry, link to asset, and inline entry nodes are allowed',
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

  campaign.changeFieldControl('title', 'builtin', 'singleLine', {});

  campaign.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      '(Example: example-campaign-title) Use hyphens to separate words.',
  });

  campaign.changeFieldControl('metadata', 'builtin', 'entryLinkEditor', {});
  campaign.changeFieldControl(
    'legacyCampaignId',
    'extension',
    'contentful-campaign-extension',
    {},
  );

  campaign.changeFieldControl(
    'campaignSettings',
    'builtin',
    'entryLinkEditor',
    {
      helpText:
        'Configurable settings for a campaign, including Action Text overrides, enabling Sixpack, etc.',
    },
  );

  campaign.changeFieldControl('template', 'builtin', 'checkbox', {});

  campaign.changeFieldControl('endDate', 'builtin', 'datePicker', {
    ampm: '12',
    format: 'timeZ',
    helpText:
      "The date the campaign will close. (Confirm that you've set the UTC-04:00 or UTC-05:00 timezones for EST/EDT (https://time.is/compare/UTC)).",
  });

  campaign.changeFieldControl('callToAction', 'builtin', 'singleLine', {});

  campaign.changeFieldControl('blurb', 'builtin', 'markdown', {
    helpText:
      "Add a short blurb for the lede banner. Bolded items will use the campaign's primary color.",
  });

  campaign.changeFieldControl('coverImage', 'builtin', 'assetLinkEditor', {});
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

  campaign.changeFieldControl('pages', 'builtin', 'entryLinksEditor', {
    bulkEditing: false,
  });

  campaign.changeFieldControl('quizzes', 'builtin', 'entryLinksEditor', {
    bulkEditing: false,
  });

  campaign.changeFieldControl('dashboard', 'builtin', 'entryLinkEditor', {});
  campaign.changeFieldControl(
    'socialOverride',
    'builtin',
    'entryLinkEditor',
    {},
  );

  campaign.changeFieldControl('landingPage', 'builtin', 'entryLinkEditor', {
    helpText: '',
  });

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
        'Add information about the scholarship & how it works with the campaign.',
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
};
