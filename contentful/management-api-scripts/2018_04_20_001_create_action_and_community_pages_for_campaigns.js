const { join } = require('path');
const { contentManagementClient } = require('./contentManagementClient');

const { LOCALE } = contentManagementClient.constants;
const { sleep, getField, attempt } = contentManagementClient.helpers;

async function transferPageBlocks(environment, args) {
  const campaignId = args['campaign-id'];
  if (campaignId) {
    const campaignEntry = await attempt(() => environment.getEntry(campaignId));

    if (!campaignEntry) {
      return;
    }

    transformCampaign(environment, campaignEntry);
  } else {
    const campaignEntries = await attempt(() =>
      environment.getEntries({
        content_type: 'campaign',
      }),
    );

    if (!campaignEntries) {
      return;
    }

    for (var i = 0; i < campaignEntries.items.length; i++) {
      const campaignEntry = campaignEntries.items[i];
      transformCampaign(environment, campaignEntry);
    }
  }
}

async function transformCampaign(environment, campaign) {
  const campaignInternalTitle = getField(campaign, 'internalTitle');
  const campaignSlug = getField(campaign, 'slug', '');
  const campaignActivityFeed = getField(campaign, 'activityFeed');
  const campaignActionSteps = getField(campaign, 'actionSteps');
  const campaignPages = getField(campaign, 'pages', []);

  if (!campaignPages.length) {
    // Ensure the campaign has a pages property with the correct locale
    campaign.fields.pages = { [LOCALE]: [] };
  }

  // If the campaign doesn't have these fields set, than presumably no transformation is needed.
  if (!campaignInternalTitle || !campaignSlug) {
    console.log(`Skipping Campaign! [ID: ${campaign.sys.id}]\n`);
    console.log('--------------------------------------------\n');
    return;
  }

  console.log(`Processing Campaign! [ID: ${campaign.sys.id}]\n`);

  if (campaignActivityFeed) {
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
      const publishedCommunityPage = await attempt(() =>
        communityPage.publish(),
      );
      if (publishedCommunityPage) {
        console.log(`Created Community Page! [ID: ${communityPage.sys.id}]\n`);

        // Add a Link to the new Page to the campaigns Pages field
        campaign.fields.pages[LOCALE].push({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: communityPage.sys.id,
          },
        });
      }
    }
  }

  if (campaignActionSteps) {
    // Creates a new action 'Page' with the actionStep blocks from the source campaign
    const actionPage = await attempt(() =>
      environment.createEntry('page', {
        fields: {
          internalTitl: {
            [LOCALE]: `${campaignInternalTitle} Action Page`,
          },
          title: {
            [LOCALE]: 'Action Page',
          },
          slug: {
            [LOCALE]: join(campaignSlug, 'action'),
          },
          blocks: {
            [LOCALE]: campaignActionSteps,
          },
        },
      }),
    );

    if (actionPage) {
      const publishedActionPage = attempt(() => actionPage.publish());
      if (publishedActionPage) {
        console.log(`Created Action Page! [ID: ${actionPage.sys.id}]\n`);

        // Add a Link to the new Page to the campaigns Pages field
        campaign.fields.pages[LOCALE].push({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: actionPage.sys.id,
          },
        });
      }
    }
  }

  const updatedCampaign = await attempt(() => campaign.update());
  if (updatedCampaign) {
    const publishedCampaign = await attempt(() => updatedCampaign.publish());
    if (publishedCampaign) {
      console.log(
        `Successfully published Campaign! [ID: ${campaign.sys.id}]\n`,
      );
    }
    console.log(`Processed Campaign! [ID: ${campaign.sys.id}]\n`);
  }

  console.log('--------------------------------------------\n');

  // API breather room
  sleep(1000);
}

contentManagementClient.init(transferPageBlocks);
