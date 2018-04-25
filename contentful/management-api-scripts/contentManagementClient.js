const { get } = require('lodash');
const parseArgs = require('minimist');
const contentful = require('contentful-management');

const LOCALE = 'en-US';

async function initContentManagementClient(callback) {
  const args = parseArgs(process.argv, {
    alias: { accessToken: 'access-token', spaceId: 'space-id' },
  });

  const { spaceId, accessToken } = args;

  if (!spaceId || !accessToken) {
    console.log(
      'Please provide the space-id and access token arguments in the following format:',
    );
    console.log('--space-id [space-id] --access-token [access-token]');
    return;
  }
  const environment = await getEnvironment(spaceId, accessToken);
  callback(environment, args);
}

async function getEnvironment(spaceId, accessToken) {
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

module.exports = {
  contentManagementClient: {
    init: initContentManagementClient,
    constants: {
      LOCALE,
    },
  },
};
