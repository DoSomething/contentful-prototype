module.exports = function(migration) {
  const page = migration
    .createContentType('page')
    .name('Page')
    .description(
      'A custom page, for example a campaign FAQ or scholarship rules.',
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
    .createField('sidebar')
    .name('Sidebar')
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
          linkContentType: ['callToAction', 'customBlock'],
        },
      ],

      linkType: 'Entry',
    });

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
            'callToAction',
            'campaignUpdate',
            'contentBlock',
            'customBlock',
            'embed',
            'galleryBlock',
            'imagesBlock',
            'linkAction',
            'petitionSubmissionAction',
            'photoSubmissionAction',
            'postGallery',
            'quiz',
            'referralSubmissionAction',
            'selectionSubmissionAction',
            'shareAction',
            'sixpackExperiment',
            'socialDriveAction',
            'softEdgeWidgetAction',
            'textSubmissionAction',
            'voterRegistrationAction',
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

  page
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField('richMediaTest')
    .name('Rich Media Test')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([
      {
        nodes: {},
      },
    ])
    .disabled(false)
    .omitted(false);

  page.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  page.changeEditorInterface('title', 'singleLine', {});
  page.changeEditorInterface('subTitle', 'singleLine', {});

  page.changeEditorInterface('slug', 'slugEditor', {
    helpText:
      'For an article page prefix with "articles/", a fact page prefix with "facts/" and for an about page prefix with "about/"',
  });

  page.changeEditorInterface('metadata', 'entryLinkEditor', {});
  page.changeEditorInterface('authors', 'entryLinksEditor', {});

  page.changeEditorInterface('coverImage', 'assetLinkEditor', {
    helpText: 'The cover Image will display on the page before the content',
  });

  page.changeEditorInterface('content', 'markdown', {});

  page.changeEditorInterface('sidebar', 'entryLinksEditor', {
    helpText: 'Add blocks to show up on alongside the main content.',
    bulkEditing: false,
  });

  page.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });

  page.changeEditorInterface('displaySocialShare', 'boolean', {
    helpText:
      "Select 'Yes' to display Social Sharing buttons on the bottom of the page. (Facebook & Twitter).",
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  page.changeEditorInterface('hideFromNavigation', 'boolean', {
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  page.changeEditorInterface('socialOverride', 'entryLinkEditor', {});
  page.changeEditorInterface('additionalContent', 'objectEditor', {});
  page.changeEditorInterface('richMediaTest', 'richTextEditor', {});
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
  cardBlock.changeEditorInterface('internalTitle', 'singleLine', {});
  cardBlock.changeEditorInterface('title', 'singleLine', {});
  cardBlock.changeEditorInterface('content', 'markdown', {});
  cardBlock.changeEditorInterface('link', 'singleLine', {});
  cardBlock.changeEditorInterface('author', 'entryLinkEditor', {});
  cardBlock.changeEditorInterface('metadata', 'entryLinkEditor', {});
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
  quiz.changeEditorInterface('internalTitle', 'singleLine', {});
  quiz.changeEditorInterface('title', 'singleLine', {});
  quiz.changeEditorInterface('slug', 'singleLine', {});
  quiz.changeEditorInterface('autoSubmit', 'boolean', {});

  quiz.changeEditorInterface('hideQuestionNumber', 'boolean', {
    helpText: 'Hide pre-titles (i.e. "Question One") from all Quiz questions',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  quiz.changeEditorInterface('results', 'json-form-editor-extension', {});

  quiz.changeEditorInterface('resultBlocks', 'entryLinksEditor', {
    helpText:
      'The result content can show up within a specified Block. You can configure which Result Block should appear based on user choices in the Choices fields',
    bulkEditing: false,
  });

  quiz.changeEditorInterface('defaultResultBlock', 'entryLinkEditor', {});
  quiz.changeEditorInterface('questions', 'json-form-editor-extension', {});
  quiz.changeEditorInterface('additionalContent', 'objectEditor', {});
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
        nodes: {
          'embedded-entry-block': [
            {
              linkContentType: [
                'callToAction',
                'campaignUpdate',
                'cardBlock',
                'contentBlock',
                'embed',
                'imagesBlock',
                'linkAction',
                'petitionSubmissionAction',
                'photoSubmissionAction',
                'postGallery',
                'referralSubmissionAction',
                'shareAction',
                'socialDriveAction',
                'textSubmissionAction',
                'voterRegistrationAction',
              ],
            },
          ],
        },
      },
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
    ])
    .disabled(false)
    .omitted(false);

  sectionBlock.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  sectionBlock.changeEditorInterface('backgroundColor', 'singleLine', {});
  sectionBlock.changeEditorInterface('textColor', 'singleLine', {});
  sectionBlock.changeEditorInterface('hyperlinkColor', 'singleLine', {});
  sectionBlock.changeEditorInterface('content', 'richTextEditor', {});

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

  imagesBlock.changeEditorInterface('internalTitle', 'singleLine', {});
  imagesBlock.changeEditorInterface('images', 'assetLinksEditor', {});
  const quizBeta = migration
    .createContentType('quizBeta')
    .name('Quiz Beta')
    .description('🚫 DO NOT USE. Deprecated.')
    .displayField('title');
  quizBeta
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  quizBeta
    .createField('subtitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  quizBeta
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

  quizBeta
    .createField('introduction')
    .name('Introduction')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  quizBeta
    .createField('conclusion')
    .name('Conclusion')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  quizBeta
    .createField('comparison')
    .name('Comparison')
    .type('Text')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  quizBeta
    .createField('callToAction')
    .name('Call to action')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  quizBeta
    .createField('results')
    .name('Results')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [],
      linkType: 'Entry',
    });

  quizBeta
    .createField('questions')
    .name('Questions')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  quizBeta
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  quizBeta.changeEditorInterface('title', 'singleLine', {});

  quizBeta.changeEditorInterface('subtitle', 'singleLine', {
    helpText: '"Quiz", "Poll", etc',
  });

  quizBeta.changeEditorInterface('slug', 'slugEditor', {});
  quizBeta.changeEditorInterface('introduction', 'markdown', {});

  quizBeta.changeEditorInterface('conclusion', 'markdown', {
    helpText: 'Use {{winner}}',
  });

  quizBeta.changeEditorInterface('comparison', 'markdown', {
    helpText: 'Use {{winner}}',
  });

  quizBeta.changeEditorInterface('callToAction', 'markdown', {});
  quizBeta.changeEditorInterface('results', 'entryLinksEditor', {});
  quizBeta.changeEditorInterface('questions', 'objectEditor', {});
  quizBeta.changeEditorInterface('additionalContent', 'objectEditor', {});
  const embed = migration
    .createContentType('embed')
    .name('Embed')
    .description('Embed content from a URL onto a page.')
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
    .validations([
      {
        regexp: {
          pattern:
            'https:\\/\\/dosomething\\.(?:carto|typeform)\\.com\\/(?:builder|to)\\/[a-zA-Z0-9-]+',
          flags: null,
        },

        message:
          'Must be a valid Carto embeddable map URL from the DoSomething space (https://dosomething.carto.com/dashboard), or a valid Typeform embeddable URL (https://dosomething.typeform.com)',
      },
    ])
    .disabled(false)
    .omitted(false);

  embed
    .createField('previewImage')
    .name('Preview Image')
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

  embed.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  embed.changeEditorInterface('url', 'singleLine', {
    helpText:
      'The URL for the embed. (Currently only supporting Carto map embed URLs. (https://dosomething.carto.com/dashboard)).',
  });

  embed.changeEditorInterface('previewImage', 'assetLinkEditor', {
    helpText:
      'If set, replaces the embed on smaller screens as a preview of the embed content.',
  });

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
  shareAction.changeEditorInterface('internalTitle', 'singleLine', {});

  shareAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue.',
  });

  shareAction.changeEditorInterface('title', 'singleLine', {
    helpText: 'Eg: "Share this link"',
  });

  shareAction.changeEditorInterface('socialPlatform', 'checkbox', {
    helpText:
      "Select the social platform to be used by the Share Action's share button. (Limited to Facebook or Twitter).",
  });

  shareAction.changeEditorInterface('content', 'markdown', {
    helpText: 'Descriptive content for the share action',
  });

  shareAction.changeEditorInterface('link', 'singleLine', {
    helpText: 'Link to be shared',
  });

  shareAction.changeEditorInterface('hideEmbed', 'boolean', {
    helpText: 'This will hide the link preview "embed" on the share action.',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  shareAction.changeEditorInterface('affirmationBlock', 'entryLinkEditor', {
    helpText:
      'This block will be displayed in a modal after a successful share. It may be used to thank the user or prompt them to complete another action.',
  });

  shareAction.changeEditorInterface('affirmation', 'markdown', {
    helpText:
      'A quick text-only affirmation message. If an affirmation block is set (above), this will be ignored!',
  });

  shareAction.changeEditorInterface('additionalContent', 'objectEditor', {
    helpText: '',
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
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  landingPage
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  landingPage
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  landingPage
    .createField('sidebar')
    .name('Sidebar')
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
          linkContentType: ['campaignUpdate', 'customBlock', 'cardBlock'],
        },
      ],

      linkType: 'Entry',
    });

  landingPage
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
            'callToAction',
            'contentBlock',
            'customBlock',
            'galleryBlock',
          ],
        },
      ],

      linkType: 'Entry',
    });

  landingPage
    .createField('additionalContent')
    .name('Additional Content')
    .type('Object')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  landingPage.changeEditorInterface('internalTitle', 'singleLine', {});
  landingPage.changeEditorInterface('title', 'singleLine', {});
  landingPage.changeEditorInterface('subTitle', 'singleLine', {});
  landingPage.changeEditorInterface('content', 'markdown', {});

  landingPage.changeEditorInterface('sidebar', 'entryLinksEditor', {
    bulkEditing: false,
  });

  landingPage.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });

  landingPage.changeEditorInterface('additionalContent', 'objectEditor', {});

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

  metadata.changeEditorInterface('internalTitle', 'singleLine', {});
  metadata.changeEditorInterface('title', 'singleLine', {});
  metadata.changeEditorInterface('description', 'multipleLine', {});

  metadata.changeEditorInterface('image', 'assetLinkEditor', {
    helpText:
      'Recommended image dimensions is 1200 x 1200 pixels with the subject centered. Facebook will crop the top and bottom of the image.',
  });

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

  selectionSubmissionAction.changeEditorInterface(
    'internalTitle',
    'singleLine',
    {
      helpText: 'This title is used internally to help find this content.',
    },
  );

  selectionSubmissionAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText:
      'The Action ID associated with this action. Action IDs can be found in Rogue: https://dosome.click/nyshrf',
  });

  selectionSubmissionAction.changeEditorInterface('title', 'singleLine', {
    helpText:
      'The title for the selection block. (Defaults to "Make a selection").',
  });

  selectionSubmissionAction.changeEditorInterface('content', 'richTextEditor', {
    helpText: 'The content displayed in the submission block.',
  });

  selectionSubmissionAction.changeEditorInterface(
    'selectionFieldLabel',
    'singleLine',
    {
      helpText:
        'The label displayed above the selection field. (Defaults to "Select one of the options below").',
    },
  );

  selectionSubmissionAction.changeEditorInterface(
    'selectionOptions',
    'listInput',
    {
      helpText:
        'The selection options for the selection block. Insert comma separated values.',
    },
  );

  selectionSubmissionAction.changeEditorInterface(
    'selectionPlaceholderOption',
    'singleLine',
    {
      helpText:
        'The placeholder selection value. This will not be a valid selection. (Defaults to "---").',
    },
  );

  selectionSubmissionAction.changeEditorInterface('buttonText', 'singleLine', {
    helpText:
      'Text to display on the submission button (defaults to "Submit").',
  });

  selectionSubmissionAction.changeEditorInterface(
    'postSubmissionLabel',
    'singleLine',
    {
      helpText: 'The text displayed under the user selection, post submission.',
    },
  );

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
  textSubmissionAction.changeEditorInterface('internalTitle', 'singleLine', {});

  textSubmissionAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue.',
  });

  textSubmissionAction.changeEditorInterface('title', 'singleLine', {});

  textSubmissionAction.changeEditorInterface('textFieldLabel', 'singleLine', {
    helpText:
      'The label for the "text" field, helping describe or prompt the user regarding what to submit.',
  });

  textSubmissionAction.changeEditorInterface(
    'textFieldPlaceholder',
    'singleLine',
    {
      helpText:
        'The placeholder for the "text" field, providing an example of what a text submission should look like.',
    },
  );

  textSubmissionAction.changeEditorInterface('buttonText', 'singleLine', {});

  textSubmissionAction.changeEditorInterface('informationTitle', 'singleLine', {
    helpText:
      'Title to display for the information block (defaults to "More Info").',
  });

  textSubmissionAction.changeEditorInterface('informationContent', 'markdown', {
    helpText:
      'Content to display for the information block (this block will be hidden by default unless content is provided).',
  });

  textSubmissionAction.changeEditorInterface(
    'affirmationContent',
    'markdown',
    {},
  );
  textSubmissionAction.changeEditorInterface(
    'additionalContent',
    'objectEditor',
    {},
  );
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
  postGallery.changeEditorInterface('internalTitle', 'singleLine', {});

  postGallery.changeEditorInterface('actionIds', 'listInput', {
    helpText:
      'A comma-separated list of one or more Action IDs to display in this gallery. Action IDs\n    can be found in Rogue: https://dosome.click/nyshrf',
  });

  postGallery.changeEditorInterface('itemsPerRow', 'radio', {
    helpText:
      'The maximum number of items in a single row when viewing the gallery in a large display.',
  });

  postGallery.changeEditorInterface('filterType', 'radio', {
    helpText: 'Allow filtering user-submitted posts by a specified type.',
  });

  postGallery.changeEditorInterface('hideReactions', 'boolean', {
    helpText: 'Hide the post reactions for this gallery.',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

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
  socialDriveAction.changeEditorInterface('internalTitle', 'singleLine', {});
  socialDriveAction.changeEditorInterface('link', 'singleLine', {});

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
          linkContentType: ['sectionBlock'],
        },
      ],

      linkType: 'Entry',
    });

  storyPage.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content. It will not be displayed anywhere on the rendered web page.',
  });

  storyPage.changeEditorInterface('title', 'singleLine', {});
  storyPage.changeEditorInterface('subTitle', 'singleLine', {});

  storyPage.changeEditorInterface('slug', 'slugEditor', {
    helpText:
      'Must begin with the "stories/" category prefix for the slug, e.g. "stories/page-name-here".',
  });

  storyPage.changeEditorInterface('metadata', 'entryLinkEditor', {});

  storyPage.changeEditorInterface('coverImage', 'assetLinkEditor', {
    helpText:
      'This cover image is used in the banner at the top of the Story Page, as well as for the tile on home page and explore campaigns.',
  });

  storyPage.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });

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
    .createField('displayOptions')
    .name('Display Options')
    .type('Array')
    .localized(false)
    .required(true)
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
          in: ['one-third', 'two-thirds', 'full'],
        },
      ],
    });

  callToAction
    .createField('visualStyle')
    .name('Visual Style')
    .type('Array')
    .localized(false)
    .required(true)
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
          in: ['light', 'dark', 'transparent'],
        },
      ],
    });

  callToAction
    .createField('useCampaignTagline')
    .name('Use Campaign Tagline')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
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
    .createField('impactPrefix')
    .name('Impact Prefix')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  callToAction
    .createField('impactValue')
    .name('Impact Value')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  callToAction
    .createField('impactSuffix')
    .name('Impact Suffix')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  callToAction
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

  callToAction.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  callToAction.changeEditorInterface('displayOptions', 'checkbox', {});
  callToAction.changeEditorInterface('visualStyle', 'checkbox', {});

  callToAction.changeEditorInterface('useCampaignTagline', 'boolean', {
    helpText:
      "Use the campaign tagline as the first line of the CTA (e.g. Let's collect another million jeans TOGETHER.).",
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  callToAction.changeEditorInterface('content', 'multipleLine', {});

  callToAction.changeEditorInterface('impactPrefix', 'singleLine', {
    helpText:
      'If using an Impact Statement, define the content before the value, like "Join"',
  });

  callToAction.changeEditorInterface('impactValue', 'singleLine', {
    helpText: 'If using an Impact Statement, define the value, like "19,500"',
  });

  callToAction.changeEditorInterface('impactSuffix', 'singleLine', {
    helpText:
      'If using an Impact Statement, define the content after the value, like "young people taking action!"',
  });

  callToAction.changeEditorInterface('actionText', 'singleLine', {
    helpText:
      'Button action text (e.g. "Sign up"). Defaults to "Join us" if left empty.',
  });

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

  sixpackExperiment.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'Used as the title of the Sixpack Experiment; try to keep it short but make it descriptive to distinguish between other experiments.',
  });

  sixpackExperiment.changeEditorInterface('control', 'entryLinkEditor', {
    helpText:
      'Link the default test (the control in the experiment) here. If running a test to compare the absence of a block versus the presence of a block, leave this field empty and it will behave as the "absent block".',
  });

  sixpackExperiment.changeEditorInterface('alternatives', 'entryLinksEditor', {
    helpText: 'Add one or more test alternative block variants here.',
    bulkEditing: false,
  });

  sixpackExperiment.changeEditorInterface('convertableActions', 'checkbox', {
    helpText:
      'Specify what actions will count towards converting the user on the experiment.',
  });

  sixpackExperiment.changeEditorInterface('trafficFraction', 'numberEditor', {
    helpText:
      'Specify the percent of traffic to run the experiment on. Defaults to 100%.',
  });

  sixpackExperiment.changeEditorInterface('kpi', 'singleLine', {
    helpText:
      'Specify a KPI to associate with this experiment in the Sixpack Web Administrative interface.',
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
          linkContentType: ['campaign', 'contentBlock', 'page', 'person'],
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

  galleryBlock.changeEditorInterface('internalTitle', 'singleLine', {});
  galleryBlock.changeEditorInterface('title', 'singleLine', {});

  galleryBlock.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });

  galleryBlock.changeEditorInterface('itemsPerRow', 'radio', {
    helpText:
      'The maximum number of items in a single row when viewing the gallery in a large display.',
  });

  galleryBlock.changeEditorInterface('imageAlignment', 'radio', {
    helpText:
      "Determines where the gallery item's images are aligned relative to their text.",
  });

  galleryBlock.changeEditorInterface('imageFit', 'radio', {
    helpText:
      "Controls the cropping method for the gallery images. 'Fill' will resize the images to ensure they      fit neatly into a square, cropping the image if needed. 'Pad' will do the same but will add padding      to the image instead of cropping it.",
  });

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

  photoSubmissionAction.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      '(Example: "Teens for Jeans 2017 Photo Submission Action") Use the campaign title, year and append "Photo Submission Action".',
  });

  photoSubmissionAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue',
  });

  photoSubmissionAction.changeEditorInterface('title', 'singleLine', {
    helpText:
      'Title to display for this block (defaults to "Submit your photo").',
  });

  photoSubmissionAction.changeEditorInterface(
    'captionFieldLabel',
    'singleLine',
    {
      helpText:
        'The label for the caption field (defaults to "Add a caption to your photo.").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'captionFieldPlaceholder',
    'singleLine',
    {
      helpText:
        'The placeholder for the caption field (defaults to "60 characters or less").',
    },
  );

  photoSubmissionAction.changeEditorInterface('showQuantityField', 'boolean', {
    helpText:
      "Should the form ask for the quantity of items in member's photo submission?",
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  photoSubmissionAction.changeEditorInterface(
    'quantityFieldLabel',
    'singleLine',
    {
      helpText:
        'The label for the quantity field (default to "How many items are in this photo?").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'quantityFieldPlaceholder',
    'singleLine',
    {
      helpText:
        'The placeholder for the quantity field (defaults to "Quantity # (e.g. 300)").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'whyParticipatedFieldLabel',
    'singleLine',
    {
      helpText:
        'The label for the why participated field (defaults to "Why is this campaign important to you?").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'whyParticipatedFieldPlaceholder',
    'singleLine',
    {
      helpText:
        'The placeholder for the why participated field (defaults to "No need to write an essay, but we\'d love to see why this matters to you!").',
    },
  );

  photoSubmissionAction.changeEditorInterface('buttonText', 'singleLine', {
    helpText:
      'The text to show for the submit button (defaults to "Submit a new photo").',
  });

  photoSubmissionAction.changeEditorInterface(
    'informationTitle',
    'singleLine',
    {
      helpText:
        'Title to display for the information block (defaults to "More Info").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'informationContent',
    'markdown',
    {
      helpText:
        'Content to display for the information block (defaults to "A DoSomething staffer will review and approve your photo.").',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'affirmationContent',
    'markdown',
    {
      helpText:
        'The text for the affirmation pop up after successful submission (contains a suitable default).',
    },
  );

  photoSubmissionAction.changeEditorInterface(
    'additionalContent',
    'objectEditor',
    {},
  );

  photoSubmissionAction.changeEditorInterface(
    'numberOfParticipantsFieldLabel',
    'singleLine',
    {
      helpText:
        'This question will ONLY show up if the label is filled out. ONLY use this field to ask members about how many people they did this campaign with. We recommend starting with "including yourself" so that users don\'t feel bad if they did it alone.',
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
    .createField('subTitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  homePage
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
          linkContentType: ['campaign', 'page', 'storyPage'],
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
  homePage.changeEditorInterface('internalTitle', 'singleLine', {});
  homePage.changeEditorInterface('title', 'singleLine', {});
  homePage.changeEditorInterface('subTitle', 'singleLine', {});

  homePage.changeEditorInterface('blocks', 'entryLinksEditor', {
    bulkEditing: false,
  });

  homePage.changeEditorInterface('additionalContent', 'objectEditor', {});
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
    .required(false)
    .validations([])
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

  campaign.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      '(Example: "Teens for Jeans 2017") This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  campaign.changeEditorInterface('title', 'singleLine', {});

  campaign.changeEditorInterface('slug', 'slugEditor', {
    helpText:
      '(Example: example-campaign-title) Use hyphens to separate words.',
  });

  campaign.changeEditorInterface('metadata', 'entryLinkEditor', {});
  campaign.changeEditorInterface(
    'legacyCampaignId',
    'contentful-campaign-extension',
    {},
  );

  campaign.changeEditorInterface('campaignSettings', 'entryLinkEditor', {
    helpText:
      'Configurable settings for a campaign, including Action Text overrides, enabling Sixpack, etc.',
  });

  campaign.changeEditorInterface('template', 'checkbox', {});

  campaign.changeEditorInterface('endDate', 'datePicker', {
    ampm: '12',
    format: 'timeZ',
  });

  campaign.changeEditorInterface('callToAction', 'singleLine', {});

  campaign.changeEditorInterface('blurb', 'markdown', {
    helpText:
      "Add a short blurb for the lede banner. Bolded items will use the campaign's primary color.",
  });

  campaign.changeEditorInterface('coverImage', 'assetLinkEditor', {});
  campaign.changeEditorInterface('campaignLead', 'entryLinkEditor', {});

  campaign.changeEditorInterface('affiliateSponsors', 'entryLinksEditor', {
    helpText:
      'Sponsors are Affiliates that pay for and promote a campaign. They recieve logo top billing at the top of the campaign page. There should usually be just one of these.',
    bulkEditing: false,
  });

  campaign.changeEditorInterface('affiliatePartners', 'entryLinksEditor', {
    helpText:
      "Partners are Affiliates that give us strategic help or resources. They don't require logos and show up at the bottom bar of the campaign page.",
    bulkEditing: false,
  });

  campaign.changeEditorInterface('affirmation', 'entryLinkEditor', {
    helpText:
      'If no affirmation added, the affirmation will use default content.',
  });

  campaign.changeEditorInterface('pages', 'entryLinksEditor', {
    bulkEditing: false,
  });

  campaign.changeEditorInterface('quizzes', 'entryLinksEditor', {
    bulkEditing: false,
  });

  campaign.changeEditorInterface('dashboard', 'entryLinkEditor', {});
  campaign.changeEditorInterface('socialOverride', 'entryLinkEditor', {});

  campaign.changeEditorInterface('landingPage', 'entryLinkEditor', {
    helpText: '',
  });

  campaign.changeEditorInterface('staffPick', 'boolean', {
    helpText: 'Is this a Staff Pick campaign?',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  campaign.changeEditorInterface('cause', 'radio', {
    helpText: 'Primary cause for this campaign',
  });

  campaign.changeEditorInterface('scholarshipAmount', 'numberEditor', {
    helpText: 'e.g. 5000',
  });

  campaign.changeEditorInterface('scholarshipDeadline', 'datePicker', {
    ampm: '12',
    format: 'timeZ',
    helpText: 'Deadline to take action and qualify for the scholarship.',
  });

  campaign.changeEditorInterface('affiliateOptInContent', 'richTextEditor', {
    helpText:
      'If there is an affiliate opt in for this campaign, input the informational content to display alongside the opt in checkbox. The affiliate opt in checkbox will only appear if this field is populated.',
  });

  campaign.changeEditorInterface('additionalContent', 'objectEditor', {});
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

  customBlock.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  customBlock.changeEditorInterface('title', 'singleLine', {});
  customBlock.changeEditorInterface('type', 'radio', {});
  customBlock.changeEditorInterface('displayOptions', 'checkbox', {});
  customBlock.changeEditorInterface('content', 'markdown', {});
  customBlock.changeEditorInterface('link', 'urlEditor', {});
  customBlock.changeEditorInterface('additionalContent', 'objectEditor', {});
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

  affirmation.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  affirmation.changeEditorInterface('header', 'singleLine', {});
  affirmation.changeEditorInterface('photo', 'assetLinkEditor', {});
  affirmation.changeEditorInterface('quote', 'markdown', {});
  affirmation.changeEditorInterface('newAuthor', 'entryLinkEditor', {});
  affirmation.changeEditorInterface('callToActionHeader', 'singleLine', {});
  affirmation.changeEditorInterface(
    'callToActionDescription',
    'singleLine',
    {},
  );
  affirmation.changeEditorInterface('author', 'singleLine', {});

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
  voterRegistrationAction.changeEditorInterface(
    'internalTitle',
    'singleLine',
    {},
  );

  voterRegistrationAction.changeEditorInterface('title', 'singleLine', {
    helpText: 'Eg: "Register To Vote!"',
  });

  voterRegistrationAction.changeEditorInterface('content', 'markdown', {});

  voterRegistrationAction.changeEditorInterface('link', 'singleLine', {
    helpText:
      'For instructions, refer to: http://bit.ly/voter-registration-action',
  });

  voterRegistrationAction.changeEditorInterface(
    'additionalContent',
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

  softEdgeWidgetAction.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This is for our internal Contentful organization and will be how the block shows up in search results, etc. It should include the Year-Month and a distinctive title to help find this content in the system.',
  });

  softEdgeWidgetAction.changeEditorInterface('title', 'singleLine', {
    helpText:
      'This will be displayed as the header within the SoftEdge widget action block.',
  });

  softEdgeWidgetAction.changeEditorInterface('softEdgeId', 'numberEditor', {
    helpText:
      'The ID of the SoftEdge action, given upon creation in SoftEdge. When you click "Publish Now", a URL will appear in the "See the Action" box. The SoftEdge ID is the last digit in the URL. e.g. SoftEdge ID = 3 in http://www.congressweb.com/dosomething/3',
  });

  softEdgeWidgetAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue.',
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
  person.changeEditorInterface('name', 'singleLine', {});
  person.changeEditorInterface('type', 'radio', {});
  person.changeEditorInterface('active', 'boolean', {});
  person.changeEditorInterface('jobTitle', 'singleLine', {});
  person.changeEditorInterface('email', 'singleLine', {});
  person.changeEditorInterface('twitterId', 'singleLine', {});
  person.changeEditorInterface('photo', 'assetLinkEditor', {});
  person.changeEditorInterface('alternatePhoto', 'assetLinkEditor', {});
  person.changeEditorInterface('description', 'markdown', {});
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

  affiliates.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  affiliates.changeEditorInterface('title', 'singleLine', {});
  affiliates.changeEditorInterface('link', 'urlEditor', {});
  affiliates.changeEditorInterface('logo', 'assetLinkEditor', {});

  affiliates.changeEditorInterface('utmLabel', 'singleLine', {
    helpText:
      'The UTM parameter label identifying this affiliate. (Primarily used to identify referring scholarship affiliate partners).',
  });

  const campaignUpdate = migration
    .createContentType('campaignUpdate')
    .name('Campaign Update')
    .description(
      'Updates by the campaign lead that show up in the main campaign activity feed. Contains a permalink and can be shared on social media. \nDocumentation can be found here http://bit.ly/campaign-update',
    )
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
    .createField('displayOptions')
    .name('Display Options')
    .type('Array')
    .localized(false)
    .required(true)
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
          in: ['two-thirds', 'full'],
        },
      ],
    });

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

  campaignUpdate
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

  campaignUpdate.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This title is used internally to help find this content in the CMS. It will not be displayed anywhere on the website.',
  });

  campaignUpdate.changeEditorInterface('displayOptions', 'checkbox', {});
  campaignUpdate.changeEditorInterface('content', 'markdown', {});

  campaignUpdate.changeEditorInterface('link', 'urlEditor', {
    helpText:
      'Link content will be inserted after the copy in the content field.',
  });

  campaignUpdate.changeEditorInterface('author', 'entryLinkEditor', {});

  campaignUpdate.changeEditorInterface('affiliateLogo', 'assetLinkEditor', {
    helpText:
      "The logo of the partner or sponsor you want to highlight, adding this field will cause this campaign update to be rendered in 'affiliate' mode. More info in the publishing documentation http://bit.ly/campaign-update.",
  });

  campaignUpdate.changeEditorInterface('socialOverride', 'entryLinkEditor', {
    helpText:
      'These values overwrite the default campaign info when sharing this campaign update.',
  });

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
  petitionSubmissionAction.changeEditorInterface(
    'internalTitle',
    'singleLine',
    {},
  );

  petitionSubmissionAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue.',
  });

  petitionSubmissionAction.changeEditorInterface('title', 'singleLine', {
    helpText:
      'The title of the petition block (defaults to "Sign The Petition").',
  });

  petitionSubmissionAction.changeEditorInterface('content', 'markdown', {
    helpText: "The petition's content.",
  });

  petitionSubmissionAction.changeEditorInterface(
    'textFieldPlaceholder',
    'singleLine',
    {
      helpText:
        'The placeholder for the "custom message" text field (defaults to "Add your custom message...").',
    },
  );

  petitionSubmissionAction.changeEditorInterface('buttonText', 'singleLine', {
    helpText:
      'Text to display on the submission button (defaults to "Add your name").',
  });

  petitionSubmissionAction.changeEditorInterface(
    'informationTitle',
    'singleLine',
    {
      helpText:
        'Title to display for the information block (defaults to "More Info").',
    },
  );

  petitionSubmissionAction.changeEditorInterface(
    'informationContent',
    'markdown',
    {
      helpText:
        'Content to display for the information block (defaults to basic information regarding what happens with user\'s signature").',
    },
  );

  petitionSubmissionAction.changeEditorInterface(
    'affirmationContent',
    'markdown',
    {
      helpText:
        'Content to display once the user successfully submits their petition reportback (defaults to a generic thank you message).',
    },
  );

  petitionSubmissionAction.changeEditorInterface(
    'additionalContent',
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

  campaignSettings.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      '(Example: "Teens for Jeans 2017 Settings") Add the campaign title, year and append "Settings" for the full internal title.',
  });

  campaignSettings.changeEditorInterface('allowExperiments', 'boolean', {
    helpText:
      'Designate whether this campaign can partake in A/B test experiments.',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  campaignSettings.changeEditorInterface('actionText', 'singleLine', {
    helpText:
      'Button action text (e.g. "Sign up") for all buttons (CTA\'s Sign Up buttons etc.) within this campaign. Defaults to "Join us" if left empty. Can be overridden for specific CTA\'s within their settings.',
  });

  const companyPage = migration
    .createContentType('companyPage')
    .name('CompanyPage')
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
          pattern: '^[a-zA-z0-9-]+\\/[a-zA-z0-9-/]+$',
        },

        message:
          'Only alphanumeric, forward-slash, and hyphen characters are allowed in slugs!',
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
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([
      {
        nodes: {
          'embedded-entry-inline': [
            {
              linkContentType: ['galleryBlock', 'imagesBlock', 'linkAction'],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  companyPage.changeEditorInterface('internalTitle', 'singleLine', {});
  companyPage.changeEditorInterface('title', 'singleLine', {});
  companyPage.changeEditorInterface('subTitle', 'singleLine', {});

  companyPage.changeEditorInterface('slug', 'slugEditor', {
    helpText: 'For an about page prefix with "about/", etc.',
  });

  companyPage.changeEditorInterface('metadata', 'entryLinkEditor', {});
  companyPage.changeEditorInterface('content', 'richTextEditor', {});

  const linkAction = migration
    .createContentType('linkAction')
    .name('Link Action')
    .description(
      'For information on how to use this component, go to http://bit.ly/link-action',
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
    .disabled(false)
    .omitted(false);

  linkAction.changeEditorInterface('internalTitle', 'singleLine', {});

  linkAction.changeEditorInterface('title', 'singleLine', {
    helpText: 'Eg: "Take this quiz!" or "Read this article"',
  });

  linkAction.changeEditorInterface('content', 'markdown', {});

  linkAction.changeEditorInterface('link', 'singleLine', {
    helpText:
      'A valid URL e.g. https://dosomething.org, or a link to a valid US telephone number e.g. tel:212 254-2390',
  });

  linkAction.changeEditorInterface('buttonText', 'singleLine', {
    helpText:
      "If you leave this blank, the link will be embedded into the Link Action with no button. (**Please do fill this out if you're using a telephone link for this action!**)",
  });

  linkAction.changeEditorInterface('affiliateLogo', 'assetLinkEditor', {
    helpText:
      'The logo of the partner or sponsor for this link action, which will appear on the bottom of the component.',
  });

  linkAction.changeEditorInterface('template', 'radio', {
    helpText:
      'https://dosomething.gitbook.io/phoenix-documentation/content-publishing/actions/link-action#cta-link-action',
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

  socialOverride.changeEditorInterface('title', 'singleLine', {
    helpText: 'Large header that displays in the card',
  });

  socialOverride.changeEditorInterface('callToAction', 'singleLine', {
    helpText: 'Smaller text that displays under the title',
  });

  socialOverride.changeEditorInterface('coverImage', 'assetLinkEditor', {
    helpText: 'Image that displays in the card',
  });

  socialOverride.changeEditorInterface('quote', 'markdown', {
    helpText:
      'Facebook specific field which displays above the card as quoted text',
  });
};
