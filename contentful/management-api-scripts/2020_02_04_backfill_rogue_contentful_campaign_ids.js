const fetch = require('node-fetch');

const { contentManagementClient } = require('./contentManagementClient.js');
const {
  attempt,
  createLogger,
  getField,
  processEntries,
  sleep,
} = require('./helpers');

let NORTHSTAR_BEARER_TOKEN;
const {
  ROGUE_URL,
  NORTHSTAR_URL,
  NORTHSTAR_AUTHORIZATION_ID,
  NORTHSTAR_AUTHORIZATION_SECRET,
} = process.env;

const NORTHSTAR_TOKEN_ENDPOINT = `${NORTHSTAR_URL}/v2/auth/token`;
const ROGUE_CAMPAIGNS_ENDPOINT = `${ROGUE_URL}/api/v3/campaigns`;

const logger = createLogger('backfill_rogue_contentful_campaign_ids');

const backfillRogueContentfulCampaignIds = async (
  environment,
  campaignEntry,
) => {
  const campaignContentfulId = campaignEntry.sys.id;
  const campaignInternalTitle = getField(campaignEntry, 'internalTitle');
  const rogueCampaignId = getField(campaignEntry, 'legacyCampaignId');

  if (!rogueCampaignId) {
    logger.info(
      `\n\nSkipping ${campaignInternalTitle} - no Rogue campaign ID.`,
    );
    return;
  }

  if (await !campaignEntry.isPublished()) {
    logger.info(`\n\nSkipping ${campaignInternalTitle} - unpublished entry.`);
    return;
  }

  logger.info(
    `\n\nProcessing ${campaignInternalTitle} with Rogue campaign ID: ${rogueCampaignId}.`,
  );

  const ROGUE_CAMPAIGN_ENDPOINT = `${ROGUE_CAMPAIGNS_ENDPOINT}/${rogueCampaignId}`;

  // Let's first make sure that a Rogue campaign with this ID actually exists!
  const isValidRogueCampaign = await fetch(ROGUE_CAMPAIGN_ENDPOINT)
    // node-fetch won't throw an exception for 404's.
    .then(res => (res.ok ? res.json() : false))
    .catch(err => logger.error(err));

  if (!isValidRogueCampaign) {
    logger.info(
      `⇢ Unable to update Campaign ID: ${rogueCampaignId}. The ID is invalid!`,
    );
    return;
  }

  await fetch(ROGUE_CAMPAIGN_ENDPOINT, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${NORTHSTAR_BEARER_TOKEN}`,
    },
    body: JSON.stringify({ contentful_campaign_id: campaignContentfulId }),
  })
    .then(response => response.json())
    .then(result =>
      logger.info(
        `✔ Updated Campaign ID: ${rogueCampaignId} with Contentful Campaign ID: ${campaignContentfulId}!`,
      ),
    )
    .catch(error =>
      logger.error(
        `☓ Failed to update Campaign ID: ${rogueCampaignId}. ERROR:\n${error}`,
      ),
    );
};

contentManagementClient.init(async (environment, args) => {
  logger.info(
    `Running 'backfill_rogue_contentful_campaign_ids', using Contentful's '${environment.sys.id}' environment & '${ROGUE_URL}'.`,
  );
  logger.info('Kicking things off in 5 seconds...');

  await sleep(5000);

  logger.info('\nObtaining Northstar access token.');

  await fetch(NORTHSTAR_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: NORTHSTAR_AUTHORIZATION_ID,
      client_secret: NORTHSTAR_AUTHORIZATION_SECRET,
      scope: 'role:admin',
    }),
  })
    .then(response => response.json())
    .then(result => {
      logger.info('✔ Obtained Northstar access token.');
      NORTHSTAR_BEARER_TOKEN = result.access_token;
    })
    .catch(error =>
      logger.error(
        `☓ Failed to obtain Northstar access token. ERROR:\n${error}`,
      ),
    );

  if (!NORTHSTAR_BEARER_TOKEN) {
    logger.error(`Cannot run script, no Northstar access token!`);
    return;
  }

  processEntries(
    environment,
    args,
    'campaign',
    backfillRogueContentfulCampaignIds,
  );
});
