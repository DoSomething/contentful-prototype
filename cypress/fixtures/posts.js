/**
 * A newly created text post.
 *
 * @param {String} campaignId
 * @param {Object} user
 * @param {String} text
 */
export const newTextPost = (campaignId, user, text) => ({
  data: {
    id: 1780,
    signup_id: 1454,
    type: 'text',
    action: 'default',
    action_id: '5',
    campaign_id: campaignId,
    media: {
      url: null,
      text,
    },
    quantity: null,
    reactions: { reacted: false, total: null },
    status: 'pending',
    location: null,
    location_name: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    northstar_id: user.id,
    tags: [],
    source: 'dev-oauth',
    source_details: '{}',
    remote_addr: '0.0.0.0',
    details: null,
  },
});

/**
 * A newly created photo post.
 *
 * @param {String} campaignId
 * @param {Object} user
 */
export const newPhotoPost = (campaignId, user) => ({
  data: {
    id: 1780,
    signup_id: 1454,
    type: 'photo',
    action: 'default',
    action_id: '5',
    campaign_id: campaignId,
    media: {
      url: null,
      text: "Let's do this!",
    },
    quantity: 1,
    reactions: { reacted: false, total: null },
    status: 'pending',
    location: null,
    location_name: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    northstar_id: user.id,
    tags: [],
    source: 'dev-oauth',
    source_details: '{}',
    remote_addr: '0.0.0.0',
    details: null,
  },
});
