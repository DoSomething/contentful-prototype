import { PHOENIX_URL } from '../constants';
import {
  makeHash,
  modifiers,
  pluralize,
  makeShareLink,
  dynamicString,
  contentfulImageUrl,
  getReferFriendsLink,
} from './index';

/**
 * Test contentfulImageUrl()
 */
test('generate contentful image url with defaults', () => {
  const contentfulImage = contentfulImageUrl(
    '//images.contentful.com/somecrazystring.jpg',
  );

  expect(contentfulImage).toBe('//images.contentful.com/somecrazystring.jpg');
});

test('generate contentful image url with specified fit', () => {
  const contentfulImage = contentfulImageUrl(
    '//images.contentful.com/somecrazystring.jpg',
    undefined,
    undefined,
    'fill',
  );

  expect(contentfulImage).toBe(
    'http://images.contentful.com/somecrazystring.jpg?fit=fill',
  );
});

test('generate contentful image url with all specified parameters', () => {
  const contentfulImage = contentfulImageUrl(
    '//images.contentful.com/somecrazystring.jpg',
    800,
    600,
    'fill',
  );

  expect(contentfulImage).toBe(
    'http://images.contentful.com/somecrazystring.jpg?fit=fill&h=600&w=800',
  );
});

/**
 * Test dynamicString()
 */
test('tokens in a string are replaced only with values that are specified', () => {
  const tokens = {
    campaignLead: 'Puppet Sloth',
    northstarId: '551234567890abcdefghijkl',
    campaignId: '1234',
    source: 'web',
  };

  // URL Examples
  const basicUrl =
    'http://example.com?userId={northstarId}&campaign={campaignId}&source={source}';

  expect(dynamicString(basicUrl, tokens)).toBe(
    'http://example.com?userId=551234567890abcdefghijkl&campaign=1234&source=web',
  );

  const complexUrl =
    'https://turbonotes.xyz/?r=user:{northstarId},campaign:{campaignId},source:{source}';

  expect(dynamicString(complexUrl, tokens)).toBe(
    'https://turbonotes.xyz/?r=user:551234567890abcdefghijkl,campaign:1234,source:web',
  );

  // Generic Text Example
  const greeting =
    'Hey friend! {campaignLead} here, welcoming you to another DoSomething Power Hour!';

  expect(dynamicString(greeting, tokens)).toBe(
    'Hey friend! Puppet Sloth here, welcoming you to another DoSomething Power Hour!',
  );
});

/**
 * Test makeHash()
 */
test('hashing the same string gives the same result', () => {
  expect(makeHash('some arbitrary string here')).toBe(
    makeHash('some arbitrary string here'),
  );
});

test('hashing a different string gives a different result', () => {
  expect(makeHash('some arbitrary string here')).not.toBe(
    makeHash('some other arbitrary string here'),
  );
});

test('cannot hash undefined or null value', () => {
  expect(() => makeHash(undefined)).toThrow();
  expect(() => makeHash(null)).toThrow();
});

/**
 * Test makeShareLink()
 */
test('it makes the expected share link for a content item and app section type', () => {
  const options = {
    domain: 'http://awesome.com',
    slug: 'seriously-awesome-campaign',
    key: '123',
    type: 'blocks',
  };

  expect(makeShareLink('campaigns', options)).toBe(
    'http://awesome.com/us/campaigns/seriously-awesome-campaign/blocks/123',
  );
});

test('it cannot make share link with an unknown app section type', () => {
  const options = {
    domain: 'http://awesome.com',
    slug: 'seriously-awesome-campaign',
    key: '123',
  };

  expect(() => makeShareLink('unknown', options)).toThrow();
});

/**
 * Test modifiers()
 */
test('prefix a class name', () => {
  expect(modifiers('danger')).toEqual(expect.arrayContaining(['-danger']));
});

test('prefix a series of class names', () => {
  expect(modifiers('danger', 'will', 'robinson')).toEqual(
    expect.arrayContaining(['-danger', '-will', '-robinson']),
  );
});

test('prefix a series of class names, ignoring undefined or null values', () => {
  expect(modifiers('danger', undefined, 'will', null, 'robinson')).toEqual(
    expect.arrayContaining(['-danger', '-will', '-robinson']),
  );
});

/**
 * Test pluralize()
 */
test('pluralizes words', () => {
  expect(pluralize(0, 'item', 'items')).toEqual('items');
  expect(pluralize(1, 'item', 'items')).toEqual('item');
  expect(pluralize(2, 'item', 'items')).toEqual('items');
});

describe('getReferFriendsLink', () => {
  const userId = '123';
  const referralCampaignId = '456';

  jsdom.reconfigure({
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
    jsdom.reconfigure({
      url: `http://phoenix.test/join`,
    });

    expect(getReferFriendsLink()).toEqual(undefined);
  });
});
