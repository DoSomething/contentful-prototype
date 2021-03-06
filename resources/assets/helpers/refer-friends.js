import { query } from './url';
import { getUserId } from './auth';
import { siteConfig } from './env';
import { PHOENIX_URL } from '../constants';

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
export function getReferFriendsLink(utmCampaign) {
  const userId = getUserId();
  const referralCampaignId = getReferralCampaignId();
  const utmCampaignValue = utmCampaign || referralCampaignId;

  if (!userId || !referralCampaignId) {
    return undefined;
  }

  return `${PHOENIX_URL}/us/join?user_id=${userId}&campaign_id=${referralCampaignId}&utm_campaign=${utmCampaignValue}&utm_medium=referral&utm_source=ds-refer-friends`;
}
