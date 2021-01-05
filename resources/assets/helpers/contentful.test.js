import { contentfulImageUrl } from './contentful';

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
