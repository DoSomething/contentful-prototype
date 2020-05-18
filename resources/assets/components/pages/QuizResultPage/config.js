/**
 * Quiz results with a sourceDetail property should pass that value along to the tracking source
 * of the StartVoterRegistrationForm displayed on the page.
 */
const sourceDetailPrefix = 'VoterRegQuiz_completed_';

export const gqlVariables = {
  production: {
    galleryBlockId: '78WaGsvDEzAxnreEvNx3Za',
    results: {
      // Vote by mail / Turtle
      p7hqjSP4Y1U6ad0UDz4iS: {
        assetId: '49Y4ucuGbJbgZL7IDDfxG0',
        sourceDetail: `${sourceDetailPrefix}votebymail`,
      },
      // In-person voting / Rabbit inperson
      '1giTEF3B2hO2CyccmhlVDm': {
        assetId: '2f2kgaHl9w5VtdswKkaBWT',
        sourceDetail: `${sourceDetailPrefix}inperson`,
      },
      // Unsure of voting / Slothie Boi
      '21PDBge2bKCTWMe5f9eo1H': {
        assetId: '1YomtHAeqXJ3qbjQNgsM0v',
        sourceDetail: `${sourceDetailPrefix}notsure`,
      },
      // Ineligible to vote / Panda
      '14KfeAs265httjNMf1jwTw': {
        assetId: '3WjT0QGNnJEPPz2yMd3inj',
      },
    },
  },
  development: {
    galleryBlockId: '2VGFq3XBcqCfKOA8mC5mP4',
    results: {
      // Super Motivated
      '347iYsbykgQe6KqeGceMUk': {
        // Panda
        assetId: '6J13jUL4YGGC1fyYMNEfbc',
      },
      // Social Voter
      '1lvJHhlJqQSgKgwIwUymQ8': {
        // Turtle:
        assetId: '3iLKsRlFQ1k9ddQbRb3RN8',
      },
      // Election Dabbler
      '2KfkCOTi7u4CqAyyCuGyci': {
        // Rabbit:
        assetId: '3uB88eZmTNEaoFxV9pZ8hX',
      },
    },
  },
};

export const placeholderContent = `Saepe cupiditate non. Facere velit vitae corporis. Voluptatum illo inventore quasi earum.

  **Necessitatibus odio nam.** Repudiandae commodi fugit. Placeat consequuntur autem dignissimos ducimus excepturi quis neque. Qui maiores voluptas illum et est laborum quia veniam. 

  Dicta quia quas impedit. Laborum id eius molestias eveniet temporibus. Rerum tempora id eos officiis omnis nam. Eveniet quod quam et hic eligendi ab et. Tempora qui consequatur dolor laudantium voluptate magnam soluta. Eaque saepe quisquam similique voluptatum error.
`;
