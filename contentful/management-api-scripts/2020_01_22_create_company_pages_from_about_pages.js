const { flatten } = require('lodash');
const { contentManagementClient } = require('./contentManagementClient');
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');
const {
  processEntries,
  getField,
  withFields,
  createLogger,
  attempt,
} = require('./helpers');

const logger = createLogger('create_company_pages_from_about_pages');

const createCompanyPageFromAboutPage = async (environment, pageEntry) => {
  const pageEntryId = pageEntry.sys.id;
  const pageInternalTitle = getField(pageEntry, 'internalTitle');
  const pageSlug = getField(pageEntry, 'slug', '');

  // Skip over non 'about' pages.
  if (!pageSlug.startsWith('about/')) {
    return;
  }

  logger.info(`Processing Page ${pageEntryId} - ${pageInternalTitle}`);

  const pageContent = getField(pageEntry, 'content');
  // Convert Markdown 'Long Text' to Rich Text format.
  const richTextFormattedContent = await richTextFromMarkdown(pageContent);

  // Import linked references as valid Rich Text embedded entry blocks.
  const blocks = getField(pageEntry, 'blocks', []);
  const richTextFormattedBlocks = blocks.map(block => {
    return {
      nodeType: 'embedded-entry-block',
      content: [],
      data: {
        target: {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: block.sys.id,
          },
        },
      },
    };
  });

  // Format Rich Text value from converted markdown and embedded blocks.
  const richTextContent = {
    nodeType: 'document',
    content: flatten([
      richTextFormattedContent.content,
      richTextFormattedBlocks,
    ]),
    data: {},
  };

  // Create the new Company Page draft derived from the About page.
  const companyPage = await attempt(() =>
    environment.createEntry(
      'companyPage',
      withFields({
        internalTitle: getField(pageEntry, 'internalTitle'),
        slug: pageSlug.replace('about/', ''),
        metadata: getField(pageEntry, 'metadata'),
        title: getField(pageEntry, 'title'),
        subTitle: getField(pageEntry, 'subTitle'),
        coverImage: getField(pageEntry, 'coverImage'),
        content: richTextContent,
      }),
    ),
  );

  if (companyPage) {
    logger.info(`-- Created Company Page! [ID: ${companyPage.sys.id}]\n`);
    // Attempt to publish the Company Page.
    const publishedCompanyPage = await attempt(() => companyPage.publish());

    if (publishedCompanyPage) {
      logger.info(`-- Published Company Page! [ID: ${companyPage.sys.id}]\n`);
    }
  }
};

contentManagementClient.init((environment, args) =>
  processEntries(environment, args, 'page', createCompanyPageFromAboutPage),
);
