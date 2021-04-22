import { PHOENIX_URL } from '../constants';
import { getReferFriendsLink } from './refer-friends';

describe('getReferFriendsLink', () => {
  const userId = '123';
  const referralCampaignId = '456';
  const defaultReferralCampaignId = '789';

  const referralUrl = `${PHOENIX_URL}/us/join?user_id=${userId}`;
  const alphaPageUrl = `${PHOENIX_URL}/us/refer-friends`;

  beforeEach(() => {
    window.jsdom.reconfigure({
      url: `${alphaPageUrl}?campaign_id=${referralCampaignId}`,
    });

    global.AUTH = { id: userId };
    global.ENV = {};
  });

  /** @test */
  it('returns referral link when user is authenticated & campaign ID query param is present', () => {
    expect(getReferFriendsLink()).toEqual(
      `${referralUrl}&campaign_id=${referralCampaignId}&utm_campaign=456&utm_medium=referral&utm_source=ds-refer-friends`,
    );
  });

  /** @test */
  it('returns referral link when user is authenticated & default campaign ID is configured', () => {
    window.jsdom.reconfigure({ url: alphaPageUrl });

    global.ENV = {
      SITE: { default_referral_campaign_id: defaultReferralCampaignId },
    };

    expect(getReferFriendsLink()).toEqual(
      `${referralUrl}&campaign_id=${defaultReferralCampaignId}&utm_campaign=789&utm_medium=referral&utm_source=ds-refer-friends`,
    );
  });

  /** @test */
  it('returns undefined if there is no user ID', () => {
    global.AUTH = {};

    expect(getReferFriendsLink()).toEqual(undefined);
  });

  /** @test */
  it('returns undefined if there is no campaign ID query param or default config', () => {
    window.jsdom.reconfigure({ url: alphaPageUrl });

    expect(getReferFriendsLink()).toEqual(undefined);
  });

  /** @test */
  it('returns referral link when a custom utm_campaign is provided', () => {
    expect(getReferFriendsLink('custom-campaign')).toEqual(
      `${referralUrl}&campaign_id=${referralCampaignId}&utm_campaign=custom-campaign&utm_medium=referral&utm_source=ds-refer-friends`,
    );
  });
});
