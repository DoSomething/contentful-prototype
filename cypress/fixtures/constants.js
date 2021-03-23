/**
 * These constants correspond to real ID's in our dev environment, used to avoid 404's.
 */

export const campaignId = '9002';

export const defaultReferralCampaignId = '9001';

export const campaignPath = '/us/campaigns/';

export const userId = '5575e568a59dbf3b7a8b4572';

// Phoenix API paths.
export const CAMPAIGN_API = `/api/v2/campaigns/${campaignId}`;
export const CAMPAIGN_POSTS_API = `${CAMPAIGN_API}/posts`;
export const POSTS_API = '/api/v2/posts';
export const QUESTIONNAIRES_API =
  'https://identity-dev.dosomething.org/api/v3/questionnaires';
