import { getUserId } from './auth';
import { PHOENIX_URL } from '../constants';
import { query, siteConfig } from './index';

/**
 * Get referral campaign ID for refer-a-friend share URL.
 *
 * @return {string}
 */
export function getReferralCampaignId() {
  return query('campaign_id') || siteConfig('default_referral_campaign_id');
}

/**
 * Get refer-a-friend share URL.
 *
 * @return {String|Undefined}
 */
export function getReferFriendsLink() {
  const userId = getUserId();
  const referralCampaignId = getReferralCampaignId();

  if (!userId || !referralCampaignId) {
    return undefined;
  }

  return `${PHOENIX_URL}/us/join?user_id=${userId}&campaign_id=${referralCampaignId}`;
}
