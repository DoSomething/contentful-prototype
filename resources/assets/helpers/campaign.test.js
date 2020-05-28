import { getCampaignFaqPath } from './campaign';

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
