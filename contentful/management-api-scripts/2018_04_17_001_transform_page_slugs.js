const { join } = require('path');
const { constants, getField, sleep } = require('./helpers');
const { contentManagementClient } = require('./contentManagementClient');

const { LOCALE } = constants;

async function transformPageSlugs(environment) {
  const campaigns = await environment.getEntries({
    content_type: 'campaign',
  });

  for (var i = 0; i < campaigns.items.length; i++) {
    const campaign = campaigns.items[i];

    const pages = getField(campaign, 'pages', []);

    for (var j = 0; j < pages.length; j++) {
      await transformPageSlug(campaign, pages[j], environment);
    }

    console.log(`Processed Campaign! [ID: ${campaign.sys.id}]\n`);
  }
}

async function transformPageSlug(campaign, page, environment) {
  const pageEntry = await environment.getEntry(page.sys.id);

  const campaignSlug = getField(campaign, 'slug');
  const pageSlug = getField(pageEntry, 'slug');

  if (!campaignSlug || !pageSlug || pageSlug.indexOf(campaignSlug) >= 0) {
    console.log(`Skipping over Page! [ID: ${pageEntry.sys.id}]`);
    return;
  }

  pageEntry.fields.slug[LOCALE] = join(campaignSlug, pageSlug);

  await pageEntry.update().then(page => page.publish());

  console.log(`Updated Page! [ID: ${pageEntry.sys.id}]`);
  console.log(`--> ${pageEntry.fields.slug[LOCALE]}\n`);

  // API breather room
  await sleep(1000);
}

contentManagementClient.init(transformPageSlugs);

// if (campaignActionSteps) {
//     // Creates a new action 'Page' with the actionStep blocks from the source campaign
//     const actionPage = await attempt(() =>
//       environment.createEntry('page', {
//         fields: {
//           internalTitle: {
//             [LOCALE]: `${campaignInternalTitle} Action Page`,
//           },
//           title: {
//             [LOCALE]: 'Action Page',
//           },
//           slug: {
//             [LOCALE]: join(campaignSlug, 'action'),
//           },
//           blocks: {
//             [LOCALE]: campaignActionSteps,
//           },
//         },
//       }),
//     );

//     if (actionPage) {
//       const publishedActionPage = attempt(() => actionPage.publish());
//       if (publishedActionPage) {
//         console.log(`  - Created Action Page! [ID: ${actionPage.sys.id}]\n`);

//         // Add a Link to the new Page to the campaigns Pages field
//         campaign.fields.pages[LOCALE].push({
//           sys: {
//             type: 'Link',
//             linkType: 'Entry',
//             id: actionPage.sys.id,
//           },
//         });
//       }
//     }
//   }
