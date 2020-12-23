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
