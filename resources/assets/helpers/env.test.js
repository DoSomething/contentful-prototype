import { env, isDevEnvironment, featureFlag, siteConfig } from './env';

describe('env() helper', () => {
  /** @test */
  test('it returns a value for a variable from window.ENV', () => {
    global.ENV = { status: 'warming' };

    expect(env('status')).toEqual('warming');
  });

  /** @test */
  test('it returns provided default value for a missing variable from window.ENV', () => {
    global.ENV = null;

    expect(env('status', 'overheating')).toEqual('overheating');
  });

  /** @test */
  test('it does not fail when the variable requested is not present in window.ENV and no default value is provided', () => {
    global.ENV = null;

    expect(env('status')).toBe(undefined);
  });
});

describe('isDevEnvironment() helper', () => {
  /** @test */
  test('it returns true when app is in local or development environment', () => {
    global.ENV = { APP_ENV: 'local' };

    expect(isDevEnvironment()).toBe(true);

    global.ENV = { APP_ENV: 'development' };

    expect(isDevEnvironment()).toBe(true);
  });

  /** @test */
  test('it returns false when APP_ENV variable is missing from window.ENV', () => {
    global.ENV = null;

    expect(isDevEnvironment()).toBe(false);
  });
});

describe('featureFlag() helper', () => {
  /** @test */
  test('it returns a value for a feature flag variable from window.ENV.FEATURE_FLAGS', () => {
    global.ENV = {
      FEATURE_FLAGS: { enable_awesome_sauce_mode: true },
    };

    expect(featureFlag('enable_awesome_sauce_mode')).toBe(true);
  });

  /** @test */
  test('it does not fail when there is no FEATURE_FLAGS config in window.ENV', () => {
    global.ENV = null;

    expect(featureFlag('enable_awesome_sauce_mode')).toBe(undefined);
  });
});

describe('siteConfig() helper', () => {
  /** @test */
  test('it returns a value for a site config variable from window.ENV.SITE', () => {
    global.ENV = {
      SITE: { 'configuration-strategy': 'alpha_delta_strategy' },
    };

    expect(siteConfig('configuration-strategy')).toEqual(
      'alpha_delta_strategy',
    );
  });

  /** @test */
  test('it does not fail when there is no SITE config in window.ENV', () => {
    global.ENV = null;

    expect(siteConfig('configuration-strategy')).toBe(undefined);
  });
});
