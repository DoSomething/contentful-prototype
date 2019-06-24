/**
 * A newly created signup.
 *
 * @param {String} campaignId
 * @param {Object} userId
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


export default null;
