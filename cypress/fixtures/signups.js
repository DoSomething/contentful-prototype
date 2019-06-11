import faker from 'faker';

/**
 * An empty response!
 */
export const emptyResponse = { data: [] };

/**
 * An existing signup.
 *
 * @param {String} campaignId
 * @param {Object} userId
 */
export const existingSignup = (campaignId, user) => {
  // We'll say this signup was created sometime in the past two months.
  const createdAt = faker.date.recent(60).toISOString();

  return {
    data: [
      {
        id: faker.random.number({ min: 1 }),
        northstar_id: user.id,
        campaign_id: campaignId,
        campaign_run_id: null,
        quantity: 0,
        created_at: createdAt,
        updated_at: createdAt,
      },
    ],
  };
};

/**
 * A newly created signup.
 *
 * @param {String} campaignId
 * @param {Object} userId
 */
export const newSignup = (campaignId, user) => ({
  data: {
    id: faker.random.number({ min: 1 }),
    northstar_id: user.id,
    campaign_id: campaignId,
    campaign_run_id: null,
    quantity: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
});
