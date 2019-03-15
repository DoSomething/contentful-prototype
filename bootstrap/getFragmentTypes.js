/* eslint-disable no-underscore-dangle,no-param-reassign */

// Load environment variables so we can run this on Heroku post-build.
require('dotenv').config();

const fs = require('fs');
const fetch = require('node-fetch');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

(async () => {
  const response = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
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

  const { data } = await response.json();

  // here we're filtering out any type information unrelated to unions or interfaces
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
