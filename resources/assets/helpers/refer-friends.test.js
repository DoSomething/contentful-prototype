import { PHOENIX_URL } from '../constants';
import { getReferFriendsLink } from './refer-friends';

describe('getReferFriendsLink', () => {
  const userId = '123';
  const referralCampaignId = '456';
  const defaultReferralCampaignId = '789';

  beforeEach(() => {
    window.jsdom.reconfigure({
      url: `http://phoenix.test/join?campaign_id=${referralCampaignId}`,
    });

    global.AUTH = { id: userId };
    global.ENV = {};
  });

  /** @test */
  it('returns referral link when user is autenticated & campaign ID query param is present', () => {
    expect(getReferFriendsLink()).toEqual(
      `${PHOENIX_URL}/us/join?user_id=${userId}&campaign_id=${referralCampaignId}`,
    );
  });

  /** @test */
  it('returns referral link when user is autenticated & default campaign ID is configured', () => {
    window.jsdom.reconfigure({ url: 'http://phoenix.test/join' });

    global.ENV = {
      SITE: { default_referral_campaign_id: defaultReferralCampaignId },
    };

    expect(getReferFriendsLink()).toEqual(
      `${PHOENIX_URL}/us/join?user_id=${userId}&campaign_id=${defaultReferralCampaignId}`,
    );
  });

  /** @test */
  it('returns undefined if there is no user ID', () => {
    global.AUTH = {};

    expect(getReferFriendsLink()).toEqual(undefined);
  });

  /** @test */
  it('returns undefined if there is no campaign ID query param or default config', () => {
    window.jsdom.reconfigure({
      url: `http://phoenix.test/join`,
    });

    expect(getReferFriendsLink()).toEqual(undefined);
  });
});
