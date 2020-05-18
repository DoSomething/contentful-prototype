const { omit } = require('lodash');

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

const logger = createLogger('remove_empty_landing_pages');

const removeEmptyLandingPage = async (environment, landingPageEntry) => {
  const landingPageInternalTitle = getField(landingPageEntry, 'internalTitle');
  const landingPageContent = getField(landingPageEntry, 'content');

  if (landingPageContent) {
    return;
  }

  logger.info(`\n\nProcessing ${landingPageInternalTitle}.`);

  const linkedCampaigns = await environment.getEntries({
    content_type: 'campaign',
    links_to_entry: landingPageEntry.sys.id,
  });

  for (let i = 0; i < linkedCampaigns.items.length; i++) {
    const campaignEntry = linkedCampaigns.items[i];
    const campaignInternalTitle = getField(campaignEntry, 'internalTitle');

    logger.info(`→ Processing linked campaign ${campaignInternalTitle}.`);

    const isArchived = await campaignEntry.isArchived();

    if (isArchived) {
      logger.info(`→ Skipping archived campaign ${campaignInternalTitle}.`);
      continue;
    }

    // Remove reference to empty landing page.
    campaignEntry.fields.landingPage[LOCALE] = null;

    const updatedCampaign = await campaignEntry.update();

    if (!updatedCampaign) {
      logger.info(`☓ Unable to update ${campaignInternalTitle}.`);
      continue;
    }

    const wasPublished = await campaignEntry.isPublished();

    if (!wasPublished) {
      logger.warn(`→ Needs review: ${campaignEntry.sys.id}`);
      continue;
    }

    publishedUpdatedCampaign = await updatedCampaign.publish();

    if (!publishedUpdatedCampaign) {
      logger.info(`☓ Unable to publish updated ${campaignInternalTitle}.`);
      continue;
    }

    logger.info(`✔ Published updated ${campaignInternalTitle}.`);
  }

  const wasLandingPagePublished = await landingPageEntry.isPublished();

  if (!wasLandingPagePublished) {
    logger.warn(`→ Landing Page needs review: ${landingPageEntry.sys.id}`);
    return;
  }

  const unpublishedLandingPage = await landingPageEntry.unpublish();

  if (!unpublishedLandingPage) {
    logger.warn(
      `☓ Unable to unpublish landing page: ${landingPageEntry.sys.id}`,
    );
    return;
  }

  await unpublishedLandingPage.delete();

  logger.info(`✔ Deleted landing page ${landingPageEntry.sys.id}.`);

  await sleep(500);
};

contentManagementClient.init(async (environment, args) => {
  logger.info(
    `Running 'remove_empty_landing_pages', using Contentful's '${environment.sys.id}' environment.`,
  );
  logger.info('Kicking things off in 5 seconds...');

  await sleep(5000);

  await processEntries(
    environment,
    args,
    'landingPage',
    removeEmptyLandingPage,
  );
});
