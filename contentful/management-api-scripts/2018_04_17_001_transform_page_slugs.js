const contentful = require('contentful-management');

const spaceId = process.argv[3];
const accessToken = process.argv[5];

if (!spaceId || !accessToken) {
  console.log(
    'Please provide the space-id and access token arguments in the following format:',
  );
  console.log('--space-id [space-id] --access-token [access-token]');
  return;
}

async function transformPageSlugs() {
  const client = contentful.createClient({
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: accessToken,
  });

  // This API call will request a space with the specified ID
  const space = await client.getSpace(spaceId);

  // This API call will request the environment with the specified - as of now hardcoded - id
  // (Contentful requires this scoping, as the `space.getEntries` is being deprecated)
  const environment = await space.getEnvironment('master');

  // Now that we have an environment, we can get entries from that environment
  const campaigns = await environment.getEntries({
    content_type: 'campaign',
  });

  campaigns.items.forEach(campaign => {
    const pages = campaign.fields.pages['en-US'];

    pages.forEach(page => {
      transformPageSlug(campaign, page, environment);
    });
  });
}

async function transformPageSlug(campaign, page, environment) {
  const pageEntry = await environment.getEntry(page.sys.id);

  pageEntry.fields.slug['en-US'] = `${campaign.fields.slug['en-US']}/${
    pageEntry.fields.slug['en-US']
  }`;

  pageEntry.update().then(page => page.publish());
}

transformPageSlugs();
