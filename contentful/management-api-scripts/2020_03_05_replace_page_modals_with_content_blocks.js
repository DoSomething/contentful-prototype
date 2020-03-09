const { contentManagementClient } = require('./contentManagementClient');
const {
  constants,
  createLogger,
  getField,
  processEntries,
  sleep,
  withFields,
} = require('./helpers');

const { LOCALE } = constants;

const logger = createLogger('replace_page_modals_with_content_blocks');

const replacedPagesIdList = [];

const replacePageModalsWithContentBlocks = async (
  environment,
  contentBlockEntry,
) => {
  const contentBlockInternalTitle = getField(
    contentBlockEntry,
    'internalTitle',
  );
  const contentBlockContent = getField(contentBlockEntry, 'content') || '';

  // Find all markdown links to modals.
  const modalLinks = contentBlockContent.match(
    /\[.+\]\(\/us\/campaigns\/.+\/modal\/[a-zA-Z0-9]+?(\s\".+\")\)/g,
  );

  if (!modalLinks) {
    return;
  }

  logger.info(
    `\n\nProcessing ${contentBlockInternalTitle} - ${modalLinks.length} modal links.`,
  );

  let contentBlockWasUpdated = false;

  for (let i = 0; i < modalLinks.length; i++) {
    const modalLink = modalLinks[i];

    // Find the modal link itself and parse out the Contentful ID.
    const modalEntryId = modalLink
      .match(/\/modal\/[a-zA-Z0-9]+/)[0]
      .replace('/modal/', '');

    const modalEntry = await environment.getEntry(modalEntryId);

    if (!modalEntry) {
      logger.info(`⇢ Skipping ${modalEntryId} - unable to fetch.`);
      continue;
    }

    const modalLinkContentType = modalEntry.sys.contentType.sys.id;

    if (modalLinkContentType !== 'page') {
      logger.info(`⇢ Skipping ${modalEntryId} - it isn't a page entry 😌.`);
      continue;
    }

    const modalEntryInternalTitle = getField(modalEntry, 'internalTitle');

    logger.info(`⇢ Deriving new ContentBlock from ${modalEntryInternalTitle}.`);

    const derivedContentBlock = await environment.createEntry(
      'contentBlock',
      withFields({
        internalTitle: modalEntryInternalTitle,
        title: getField(modalEntry, 'title'),
        content: getField(modalEntry, 'content'),
      }),
    );

    await derivedContentBlock.publish();

    logger.info(
      `⇢ Replacing ${modalEntryId} with ${derivedContentBlock.sys.id}.`,
    );

    // Replace the page modal Contentful ID with the derived Content Block ID.
    contentBlockEntry.fields.content[LOCALE] = getField(
      contentBlockEntry,
      'content',
    ).replace(modalEntryId, derivedContentBlock.sys.id);

    replacedPagesIdList.push(modalEntryId);

    contentBlockWasUpdated = true;
  }

  if (!contentBlockWasUpdated) {
    return;
  }

  const updatedContentBlock = await contentBlockEntry.update();

  if (!updatedContentBlock) {
    logger.info(`☓ Unable to update ${contentBlockInternalTitle}.`);
    return;
  }

  publishedUpdatedContentBlock = await updatedContentBlock.publish();

  if (!publishedUpdatedContentBlock) {
    logger.info(`☓ Unable to publish updated ${contentBlockInternalTitle}.`);
    return;
  }

  logger.info(`✔ Published updated ${contentBlockInternalTitle}.`);

  await sleep(500);
};

contentManagementClient.init(async (environment, args) => {
  logger.info(
    `Running 'replace_page_modals_with_content_blocks', using Contentful's '${environment.sys.id}' environment.`,
  );
  logger.info('Kicking things off in 5 seconds...');

  await sleep(5000);

  await processEntries(
    environment,
    args,
    'contentBlock',
    replacePageModalsWithContentBlocks,
  );

  logger.info(
    `\n\n\nHere are all the ${replacedPagesIdList.length} replaced pages:\n ${replacedPagesIdList}`,
  );
});
