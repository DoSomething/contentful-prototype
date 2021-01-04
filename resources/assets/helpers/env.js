/* global window */

import { get } from 'lodash';

/**
 * Get a value from the window.ENV
 *
 * @param  {String} key
 * @return {String}
 */
export function env(key, defaultVal) {
  return get(window.ENV, key, defaultVal);
}

/**
 * Check to see if running in a development enviroment.
 *
 * @return {Boolean}
 */
export function isDevEnvironment() {
  return ['local', 'development'].includes(
    get(window.ENV, 'APP_ENV', 'production'),
  );
}

/**
 * Get feature flag value from window.ENV
 *
 * @param  {String} feature
 * @param  {*}      defaultVal
 * @return {*}
 */
export function featureFlag(feature, defaultVal) {
  return get(env('FEATURE_FLAGS'), feature, defaultVal);
}

/**
 * Get site config value from window.ENV
 *
 * @param  {String} config
 * @param  {*}      defaultVal
 * @return {*}
 */
export function siteConfig(config, defaultVal) {
  return get(env('SITE'), config, defaultVal);
}

export default null;
