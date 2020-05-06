/* eslint-disable no-restricted-syntax, no-await-in-loop, no-continue */

const { contentManagementClient } = require('./contentManagementClient');
const {
  createLogger,
  getField,
  withFields,
  linkReference,
  constants,
  sleep,
} = require('./helpers');

const { LOCALE } = constants;

const logger = createLogger('migrate_cta_blocks');

contentManagementClient.init(async environment => {
  logger.info(
    `Running 'migrate_cta_blocks', using Contentful's '${environment.sys.id}' environment.`,
  );
  logger.info('Kicking things off in 5 seconds...');

  await sleep(5000);

  const blocks = await environment.getEntries({
    content_type: 'linkAction',
    'fields.template': 'cta',
  });

  logger.info(`Found ${blocks.items.length} Link Actions with CTA template`);

  for (let i = 0; i < blocks.items.length; i += 1) {
    const linkAction = blocks.items[i];

    // Find all Entries which link to the CTA-type LinkAction.
    const linkedEntries = await environment.getEntries({
      links_to_entry: linkAction.sys.id,
    });

    const internalTitle = getField(linkAction, 'internalTitle');
    logger.info(
      `\n\nProcessing ${linkedEntries.items.length} links to "${internalTitle}".`,
    );

    // Archive things that aren't linked
    if (linkedEntries.items.length === 0) {
      logger.info(`⇢ Archiving '${internalTitle}', not linked anywhere...`);
      if ((await linkAction.isPublished) && (await !linkAction.isArchived)) {
        await linkAction.unpublish();
        logger.info(`⇢ Unpublished LinkAction...`);
      }
      if (await !linkAction.isArchived) {
        await linkAction.archive();
        logger.info(`⇢ Archived successfully`);
      }
      continue;
    }

    // Make the new CTA block
    const ctaBlock = await environment.createEntry(
      'callToAction',
      withFields({
        internalTitle,
        title: getField(linkAction, 'title'),
        content: getField(linkAction, 'content'),
        linkText: getField(linkAction, 'buttonText', 'Get Started'),
        link: getField(linkAction, 'link').trim(),
        template: 'Purple',
        alignment: 'Center',
      }),
    );

    // Publish new block
    await ctaBlock.publish();

    // Loop through and get all places where the old block is linked
    for (let j = 0; j < linkedEntries.items.length; j += 1) {
      const page = linkedEntries.items[j];
      const pageTitle = getField(page, 'internalTitle');
      const id = page.sys.id;

      // Skip archived pages
      const isPageArchived = await page.isArchived();
      if (isPageArchived) {
        logger.info(`⇢ Skipping '${id}', archived.`);
        continue;
      }

      if (!page.fields.blocks) {
        logger.info(`⇢ Skipping '${id}', rich text field type.`);
        continue;
      }

      // Replace old entity with new one
      const linkActionIndex = page.fields.blocks[LOCALE].findIndex(
        block => block.sys.id === linkAction.sys.id,
      );
      const newIndex = linkReference(ctaBlock.sys.id);
      page.fields.blocks[LOCALE].splice(linkActionIndex, 1, newIndex);

      // Make sure that we don't publish an unpublished campaign by mistake:
      const wasPublished = await page.isPublished();
      const updatedPage = await page.update();

      if (!updatedPage) {
        logger.error(`→ Could not update reference for "${pageTitle}".`);
        continue;
      }

      if (!wasPublished) {
        logger.warn(`→ Needs review: ${updatedPage.sys.id}`);
        continue;
      }

      const publishedPage = await updatedPage.publish();

      if (publishedPage) {
        logger.info(
          `✔ Published "${pageTitle}": https://qa.dosomething.org/us/campaigns/${publishedPage.fields.slug[LOCALE]}`,
        );
      }
    }

    // // Archive old LinkActions
    if ((await linkAction.isPublished) && (await !linkAction.isArchived)) {
      await linkAction.unpublish();
      logger.info(`⇢ Unpublished LinkAction...`);
    }
    if (await !linkAction.isArchived) {
      await linkAction.archive();
      logger.info(`⇢ Archived successfully`);
    }
  }
});
