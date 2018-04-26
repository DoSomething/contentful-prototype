const fs = require('fs');
const { join } = require('path');
const {
  attempt,
  constants,
  getField,
  linkReference,
  log,
  processEntries,
  sleep,
} = require('./helpers');
const { contentManagementClient } = require('./contentManagementClient');

const { LOCALE } = constants;

let logStream = fs.createWriteStream(
  `${__dirname}/logs/community_page_from_activity_feed_${new Date().getTime()}.txt`,
);

async function addCommunityPageFromActivityFeed(
  environment,
  campaign,
  logStream,
) {
  // Set up reference to our stream object in helpers/log
  log('', logStream);

  const campaignInternalTitle = getField(campaign, 'internalTitle');
  const campaignSlug = getField(campaign, 'slug');
  const campaignActivityFeed = getField(campaign, 'activityFeed');
  const campaignPages = getField(campaign, 'pages', []);

  if (!campaignPages.length) {
    // Ensure the campaign has a pages property with the correct locale
    campaign.fields.pages = { [LOCALE]: [] };
  }

  // If the campaign doesn't have these fields set, than presumably no transformation is needed.
  if (!campaignInternalTitle || !campaignSlug || !campaignActivityFeed) {
    log(`Skipping Campaign! [ID: ${campaign.sys.id}]\n`);
    log('--------------------------------------------\n');
    return;
  }

  log(`Processing Campaign! [ID: ${campaign.sys.id}]\n`);

  // Create a new community 'Page' with the activityFeed blocks from the source campaign
  const communityPage = await attempt(() =>
    environment.createEntry('page', {
      fields: {
        internalTitle: {
          [LOCALE]: `${campaignInternalTitle} Community Page`,
        },
        title: {
          [LOCALE]: 'Community Page',
        },
        slug: {
          [LOCALE]: join(campaignSlug, 'community'),
        },
        blocks: {
          [LOCALE]: campaignActivityFeed,
        },
      },
    }),
  );

  if (communityPage) {
    const publishedCommunityPage = await attempt(() => communityPage.publish());
    if (publishedCommunityPage) {
      const id = publishedCommunityPage.sys.id;
      log(`  - Created Community Page! [ID: ${id}]\n`);

      // Add a Link to the new Page to the campaigns Pages field
      campaign.fields.pages[LOCALE].push(linkReference(id));

      // Update and publish the campaign
      const updatedCampaign = await attempt(() => campaign.update());
      if (updatedCampaign) {
        const publishedCampaign = await attempt(() =>
          updatedCampaign.publish(),
        );
        if (publishedCampaign) {
          log(
            `  - Successfully published Campaign! [ID: ${campaign.sys.id}]\n`,
          );
        }
      }
    }
  }

  log(`Processed Campaign! [ID: ${campaign.sys.id}]\n`);
  log('--------------------------------------------\n');

  // API breather room
  sleep(1000);
}

contentManagementClient.init((environment, args) =>
  processEntries(
    environment,
    args,
    logStream,
    'campaign',
    addCommunityPageFromActivityFeed,
  ),
);
// stream.end();
