const { get } = require('lodash');
const parseArgs = require('minimist');
const contentful = require('contentful-management');

const LOCALE = 'en-US';

async function initContentManagementClient(callback) {
  const args = parseArgs(process.argv, {
    alias: {
      accessToken: 'access-token',
      spaceId: 'space-id',
      environmentId: 'environment-id',
    },
  });

  const { spaceId, accessToken, environmentId } = args;

  if (!spaceId || !accessToken) {
    console.log(
      'Please provide the space, environment & access token in the following format:',
    );
    console.log(
      '--space-id [id] --access-token [token] --environment-id [master|qa|dev]',
    );
    return;
  }
  const environment = await getEnvironment(spaceId, accessToken, environmentId);
  callback(environment, args);
}

async function getEnvironment(spaceId, accessToken, environmentId = 'dev') {
  const client = contentful.createClient({
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: accessToken,
  });

  // This API call will request a space with the specified ID
  const space = await client.getSpace(spaceId);

  // This API call will request the environment with the specified - as of now hardcoded - id
  // (Contentful requires this scoping, as the `space.getEntries` is being deprecated)
  return space.getEnvironment(environmentId);
}

module.exports = {
  contentManagementClient: {
    init: initContentManagementClient,
    constants: {
      LOCALE,
    },
  },
};
