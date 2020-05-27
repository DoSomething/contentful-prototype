import { PHOENIX_URL } from '../constants';
import { getReferFriendsLink } from './refer-friends';

describe('getReferFriendsLink', () => {
  const userId = '123';
  const referralCampaignId = '456';

  window.jsdom.reconfigure({
    url: `http://phoenix.test/join?campaign_id=${referralCampaignId}`,
  });

  global.AUTH = { id: userId };

  /** @test */
  it('returns referral link when user is autenticated & campaign ID query param is present', () => {
    expect(getReferFriendsLink()).toEqual(
      `${PHOENIX_URL}/us/join?user_id=${userId}&campaign_id=${referralCampaignId}`,
    );
  });

  /** @test */
  it('returns undefined if there is no user ID', () => {
    global.AUTH = {};

    expect(getReferFriendsLink()).toEqual(undefined);
  });

  /** @test */
  it('returns undefined if there is no campaign ID query param', () => {
    window.jsdom.reconfigure({
      url: `http://phoenix.test/join`,
    });

    expect(getReferFriendsLink()).toEqual(undefined);
  });
});
