import userCampaignSignups from './__mocks__/userCampaignSignups';
import { getCampaignFaqPath, groupUserCampaignSignups } from './campaign';

describe('getCampaignFaqPath', () => {
  global.STATE = {
    campaign: { pages: [{ fields: { slug: 'puppet-party/faq' } }] },
  };

  /** @test */
  it('returns fully formed FAQ path when the campaign has an faq page', () => {
    expect(getCampaignFaqPath()).toEqual(`/us/campaigns/puppet-party/faq`);
  });

  /** @test */
  it('returns fully formed FAQ path when the campaign has an faqs page with a trailing "s"', () => {
    global.STATE = {
      campaign: { pages: [{ fields: { slug: 'puppet-party/faqs' } }] },
    };

    expect(getCampaignFaqPath()).toEqual(`/us/campaigns/puppet-party/faqs`);
  });

  /** @test */
  it('safely returns undefined when there is no campaign in STATE', () => {
    global.STATE = {};

    expect(getCampaignFaqPath()).toBeUndefined();
  });
});

describe('groupUserCampaignSignups', () => {
  /** @test */
  it('groups signups correctly into the three expected categories', () => {
    const groupedSignups = groupUserCampaignSignups(
      userCampaignSignups.edges.map(edge => edge.node),
    );

    expect(groupedSignups.complete).toMatchObject([{ id: 3682 }, { id: 1488 }]);

    expect(groupedSignups.incomplete).toMatchObject([
      { id: 1530 },
      { id: 1474 },
    ]);

    expect(groupedSignups.expired).toMatchObject([{ id: 1476 }]);
  });
});
