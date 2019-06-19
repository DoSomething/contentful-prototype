//
// This script pre-loads information on GraphQL unions & interfaces so that
// Apollo Client's "introspection fragment matcher" can know how to cache
// incoming objects (e.g. that PostGalleryBlock is a Block).
//
// This follows Apollo's official documentation <https://goo.gl/UQeuMc> for
// how to handle this problem, with a few tweaks for readability.
//
// This will run on local, CircleCI, and Heroku builds, using GRAPHQL_URL.
//

require('dotenv').config();

const fs = require('fs');
const fetch = require('node-fetch');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

(async () => {
  const response = await fetch(`${process.env.GRAPHQL_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {},
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
    }),
  });

  // Filter out only the unions & interfaces we need for introspection matcher:
  const { data } = await response.json();
  const unionsAndInterfaces = data.__schema.types.filter(
    ({ possibleTypes }) => possibleTypes !== null,
  );

  await writeFile(
    './resources/assets/fragmentTypes.json',
    JSON.stringify({
      __schema: {
        types: unionsAndInterfaces,
      },
    }),
  );

  console.log('Fragment types successfully extracted!');
})();
