const { get } = require('lodash');
const { contentManagementClient } = require('./contentManagementClient');
const {
  attempt,
  createLogger,
  getField,
  processEntries,
  sleep,
  withFields,
  linkReference,
  constants,
} = require('./helpers');

const { LOCALE } = constants;

const logger = createLogger('import_campaign_blurb_from_landing_page_content');

async function importCampaignBlurbFromLandingPageContent(
  environment,
  campaignEntry,
) {
  const internalTitle = getField(campaignEntry, 'internalTitle');
  const landingPageEntry = getField(campaignEntry, 'landingPage');
  const landingPageEntryId = landingPageEntry ? landingPageEntry.sys.id : null;

  logger.info(
    `Processing Campaign ${campaignEntry.sys.id} - ${internalTitle}\n`,
  );

  logger.info('Campaign Blurb:');
  logger.info(getField(campaignEntry, 'blurb'));

  if (landingPageEntryId) {
    logger.info(`\nFetching Landing Page ${landingPageEntryId}\n`);

    // @TODO: Shouldn't have to fetch here, should get loaded entry from processEntries.
    const loadedLandingPageEntry = await environment.getEntry(
      landingPageEntryId,
    );
    const landingPageContent = getField(loadedLandingPageEntry, 'content');

    logger.info('Landing Page Content:');
    logger.info(landingPageContent);
  }

  logger.info('----------------');
}

contentManagementClient.init((environment, args) =>
  processEntries(
    environment,
    args,
    'campaign',
    importCampaignBlurbFromLandingPageContent,
  ),
);
