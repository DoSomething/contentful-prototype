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

async function getEnvironment() {
  const client = contentful.createClient({
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: accessToken,
  });

  // This API call will request a space with the specified ID
  const space = await client.getSpace(spaceId);

  // This API call will request the environment with the specified - as of now hardcoded - id
  // (Contentful requires this scoping, as the `space.getEntries` is being deprecated)
  return space.getEnvironment('master');
}

async function transformPageSlugs() {
  const environment = await getEnvironment();

  // Now that we have an environment, we can get entries from that environment
  const campaigns = await environment.getEntries({
    content_type: 'campaign',
  });

  campaigns.items.forEach(campaign => {
    const pages = campaign.fields.pages['en-US'];

    pages.forEach(page => {
      transformPageSlug(campaign, page, environment);
    });

    console.log(`Updated Campaign! [ID: ${campaign.sys.id}]\n`);
  });
}

async function transformPageSlug(campaign, page, environment) {
  const pageEntry = await environment.getEntry(page.sys.id);

  const locale = 'en-US';

  if (!pageEntry.fields.slug || !campaign.fields.slug) {
    return;
  }

  pageEntry.fields.slug[locale] = `${campaign.fields.slug[locale]}/${
    pageEntry.fields.slug[locale]
  }`;

  pageEntry.update().then(page => page.publish());

  console.log(`Updated Page! [ID: ${pageEntry.sys.id}]`);
  console.log(`--> ${pageEntry.fields.slug[locale]}\n`);
}

transformPageSlugs();
