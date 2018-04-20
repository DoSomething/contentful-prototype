const { join } = require('path');
const { contentManagementClient } = require('./contentManagementClient');

const { LOCALE } = contentManagementClient.constants;
const { sleep, getField } = contentManagementClient.helpers;

async function transferPageBlocks(environment) {
  const campaigns = await environment.getEntries({
    content_type: 'campaign',
  });

  for (var i = 0; i < campaigns.items.length; i++) {
    const campaign = campaigns.items[i];

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
      continue;
    }

    if (campaignActivityFeed) {
      // Create a new community 'Page' with the activityFeed blocks from the source campaign
      const communityPage = await environment.createEntry('page', {
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
      });

      await communityPage.publish();
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

    if (campaignActivityFeed) {
      // Creates a new action 'Page' with the actionStep blocks from the source campaign
      const actionPage = await environment.createEntry('page', {
        fields: {
          internalTitle: {
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
      });

      await actionPage.publish();
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

    await campaign.update().then(campaign => campaign.publish());

    console.log(`Processed Campaign! [ID: ${campaign.sys.id}]\n`);
    console.log('--------------------------------------------\n');

    // API breather room
    sleep(1000);
  }
}

contentManagementClient.init(function(environment) {
  transferPageBlocks(environment);
});
