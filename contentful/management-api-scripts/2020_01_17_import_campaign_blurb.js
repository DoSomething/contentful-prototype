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
  campaign,
) {
  logger.info(`Processing campaign ${campaignEntry.sys.id}\n`);

  logger.info('--------------------------------------------\n');
}

contentManagementClient.init((environment, args) =>
  processEntries(
    environment,
    args,
    'campaign',
    importCampaignBlurbFromLandingPageContent,
  ),
);
