const { get } = require('lodash');
const { contentManagementClient } = require('./contentManagementClient');
const {
  attempt,
  createLogger,
  getField,
  processEntries,
  constants,
} = require('./helpers');

const { LOCALE } = constants;

const logger = createLogger('import_campaign_blurb_from_landing_page_content');

async function importCampaignBlurbFromLandingPageContent(
  environment,
  campaignEntry,
) {
  const campaignEntryId = campaignEntry.sys.id;
  const campaignInternalTitle = getField(campaignEntry, 'internalTitle');
  const campaignAdditionalContent = getField(
    campaignEntry,
    'additionalContent',
  );

  logger.info(
    `Processing Campaign ${campaignEntryId} - ${campaignInternalTitle}`,
  );

  if (
    get(campaignAdditionalContent, 'featureFlagUseLegacyTemplate', false) ===
    true
  ) {
    logger.info('Skipping import for legacy template.');
    return;
  }

  const landingPageEntry = getField(campaignEntry, 'landingPage');
  const landingPageEntryId = landingPageEntry ? landingPageEntry.sys.id : null;

  if (!landingPageEntryId) {
    logger.info('Landing Page entry not found.');

    return;
  }

  logger.info(`Fetching Landing Page ${landingPageEntryId}`);

  const loadedLandingPageEntry = await environment.getEntry(landingPageEntryId);
  const landingPageContent = getField(loadedLandingPageEntry, 'content');

  if (!landingPageContent) {
    logger.info('Landing Page content field is not set.');

    return;
  }

  // Determine if the campaign entry was already published to prevent publishing a draft entry.
  const wasCampaignEntryPublished = await campaignEntry.isPublished();
  // Initalize an object to write save to the Campaign blurb field.
  const newBlurbValue = {};

  // Update the Campaign blurb with its Landing Page content.
  newBlurbValue[LOCALE] = landingPageContent;
  campaignEntry.fields.blurb = newBlurbValue;

  // Attempt to update the campaign entry.
  const updatedCampaignEntry = await attempt(() => campaignEntry.update());

  if (updatedCampaignEntry) {
    logger.info(`-- Updated Campaign! [ID: ${campaignEntryId}]\n`);
  }

  if (updatedCampaignEntry && wasCampaignEntryPublished) {
    // Attempt to publish the entry.
    const publishedCampaignEntry = await attempt(() =>
      updatedCampaignEntry.publish(),
    );

    if (publishedCampaignEntry) {
      logger.info(`-- Published Campaign! [ID: ${campaignEntryId}]\n`);
    }
  }
}

contentManagementClient.init((environment, args) =>
  processEntries(
    environment,
    args,
    'campaign',
    importCampaignBlurbFromLandingPageContent,
  ),
);
