import {
  makeHash,
  modifiers,
  pluralize,
  dynamicString,
  contentfulImageUrl,
  siteConfig,
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

/**
 * Test siteConfig()
 */
describe('siteConfig helper', () => {
  /** @test */
  test('it returns a site config variable from window.ENV', () => {
    global.ENV = {
      SITE: { 'configuration-strategy': 'alpha_delta_strategy' },
    };

    expect(siteConfig('configuration-strategy')).toEqual(
      'alpha_delta_strategy',
    );
  });

  /** @test */
  test("it doesn't fail when there's no config", () => {
    global.ENV = null;

    expect(siteConfig('configuration-strategy')).toBe(undefined);
  });
});
