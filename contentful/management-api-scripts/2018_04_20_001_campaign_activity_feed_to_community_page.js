const { join } = require('path');
const { get } = require('lodash');
const {
  attempt,
  constants,
  createLogger,
  getField,
  linkReference,
  processEntries,
  withFields,
  sleep,
} = require('./helpers');
const { contentManagementClient } = require('./contentManagementClient');

const { LOCALE } = constants;

const logger = createLogger('community_page_from_activity_feed');

async function addCommunityPageFromActivityFeed(environment, campaign) {
  const campaignInternalTitle = getField(campaign, 'internalTitle');
  const campaignSlug = getField(campaign, 'slug');
  const campaignActivityFeed = getField(campaign, 'activity_feed');
  const campaignPages = getField(campaign, 'pages', []);
  const campaignAdditionalContent = getField(campaign, 'additionalContent');

  if (!campaignPages.length) {
    // Ensure the campaign has a pages property with the correct locale
    campaign.fields.pages = { [LOCALE]: [] };
  }

  // If the campaign doesn't have these fields set, than presumably no transformation is needed.
  if (!campaignInternalTitle || !campaignSlug || !campaignActivityFeed) {
    logger.info(`Skipping Campaign! [ID: ${campaign.sys.id}]\n`);
    logger.info('--------------------------------------------\n');
    return;
  }

  logger.info(`Processing Campaign! [ID: ${campaign.sys.id}]\n`);

  let communityPageBlocks = [];

  // Copy over all block link references from activity_feed besides for `reportbacks` custom blocks
  for (let i = 0; i < campaignActivityFeed.length; i++) {
    const block = campaignActivityFeed[i];
    const blockEntry = await attempt(() => environment.getEntry(block.sys.id));

    if (!blockEntry) {
      continue;
    }

    const contentType = get(blockEntry.sys, 'contentType.sys.id');
    const blockType = getField(blockEntry, 'type');

    if (contentType === 'customBlock' && blockType === 'reportbacks') {
      logger.info(
        `    * Skipping a 'reportbacks' custom block! [ID: ${block.sys.id}]\n`,
      );
      continue;
    }

    communityPageBlocks.push(block);
  }

  // Reverse the community page blocks for activity_feeds which were still ordered top to bottom
  const reverseActivityFeedOrder = get(
    campaignAdditionalContent,
    'reverseActivityFeedOrder',
  );
  if (reverseActivityFeedOrder === false) {
    communityPageBlocks = communityPageBlocks.reverse();
  }

  // Create a new community 'Page' with the activity_feed blocks from the source campaign
  const communityPage = await attempt(() =>
    environment.createEntry(
      'page',
      withFields({
        internalTitle: `${campaignInternalTitle} Community Page`,
        title: 'Community',
        slug: join(campaignSlug, 'community'),
        blocks: communityPageBlocks,
      }),
    ),
  );

  if (communityPage) {
    const publishedCommunityPage = await attempt(() => communityPage.publish());
    if (publishedCommunityPage) {
      const id = publishedCommunityPage.sys.id;
      logger.info(`  - Created Community Page! [ID: ${id}]\n`);

      // Add a Link to the new Page to the campaigns Pages field
      campaign.fields.pages[LOCALE].push(linkReference(id));
      // Remove activity_feed blocks from campaign
      campaign.fields.activity_feed[LOCALE] = [];

      // Update and publish the campaign
      const updatedCampaign = await attempt(() => campaign.update());
      if (updatedCampaign) {
        const publishedCampaign = await attempt(() =>
          updatedCampaign.publish(),
        );
        if (publishedCampaign) {
          logger.info(
            `  - Successfully published Campaign! [ID: ${campaign.sys.id}]\n`,
          );
        }
      }
    }
  }

  logger.info(`Processed Campaign! [ID: ${campaign.sys.id}]\n`);
  logger.info('--------------------------------------------\n');

  // API breather room
  sleep(1000);
}

contentManagementClient.init((environment, args) =>
  processEntries(
    environment,
    args,
    'campaign',
    addCommunityPageFromActivityFeed,
  ),
);
