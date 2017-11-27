import {
  makeHash,
  modifiers,
  pluralize,
  makeShareLink,
  contentfulImageUrl,
} from './index';

/**
 * Test contentfulImageUrl()
 */
test('generate contentful image url with defaults', () => {
  const contentfulImage = contentfulImageUrl('//images.contentful.com/somecrazystring.jpg');

  expect(contentfulImage).toBe('//images.contentful.com/somecrazystring.jpg');
});

test('generate contentful image url with specified fit', () => {
  const contentfulImage = contentfulImageUrl('//images.contentful.com/somecrazystring.jpg', undefined, undefined, 'fill');

  expect(contentfulImage).toBe('//images.contentful.com/somecrazystring.jpg?fit=fill');
});

test('generate contentful image url with all specified parameters', () => {
  const contentfulImage = contentfulImageUrl('//images.contentful.com/somecrazystring.jpg', 800, 600, 'fill');

  expect(contentfulImage).toBe('//images.contentful.com/somecrazystring.jpg?w=800&h=600&fit=fill');
});

/**
 * Test makeHash()
 */
test('hashing the same string gives the same result', () => {
  expect(makeHash('some arbitrary string here')).toBe(makeHash('some arbitrary string here'));
});

test('hashing a different string gives a different result', () => {
  expect(makeHash('some arbitrary string here')).not.toBe(makeHash('some other arbitrary string here'));
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

  expect(makeShareLink('campaigns', options)).toBe('http://awesome.com/us/campaigns/seriously-awesome-campaign/blocks/123');
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
  expect(modifiers('danger', 'will', 'robinson')).toEqual(expect.arrayContaining(['-danger', '-will', '-robinson']));
});

test('prefix a series of class names, ignoring undefined or null values', () => {
  expect(modifiers('danger', undefined, 'will', null, 'robinson')).toEqual(expect.arrayContaining(['-danger', '-will', '-robinson']));
});

/**
 * Test pluralize()
 */
test('pluralizes words', () => {
  expect(pluralize(0, 'item', 'items')).toEqual('items');
  expect(pluralize(1, 'item', 'items')).toEqual('item');
  expect(pluralize(2, 'item', 'items')).toEqual('items');
});
