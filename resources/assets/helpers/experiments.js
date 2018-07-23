/* global window */

import { get } from 'lodash';
import client from 'sixpack-client';

import experimentsDefinitions from '../experiments.json';

/**
 * Check whether the app state fulfills the given test
 *
 * @param  {String} test
 * @param  {Object} state
 * @return {Boolean}
 */
export function assertTestPasses(test, state) {
  const schema = experimentsDefinitions[test].meta.preTest;
  const keys = Object.keys(schema);
  const values = Object.values(schema);

  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    const value = values[index];

    // Check if the test matches the app state.
    if (get(state, key, false) !== value) {
      return false;
    }
  }

  return true;
}

/**
 * Instantiate a new Sixpack Client.
 */
export function sixpack() {
  const env = window.ENV || {};

  if (!env.SIXPACK_BASE_URL) {
    throw new Error('Missing Sixpack configuration settings.');
  }

  return new client.Session({
    base_url: env.SIXPACK_BASE_URL,
    cookie_name: env.SIXPACK_COOKIE_PREFIX || 'sixpack',
  });
}

/**
 * Check if experiment should be converted when user expresses Signup intent.
 *
 * @param  {String} name
 * @return {Boolean}
 */
export function convertOnSignupIntent(name) {
  return experimentsDefinitions[name].meta.convertOnSignupIntent;
}

/**
 * Participate current client to specified experiment.
 *
 * @param  {String} name
 * @return {Promise}
 */
export function participate(name) {
  return new Promise((resolve, reject) => {
    const alternatives = Object.values(
      experimentsDefinitions[name].alternatives,
    );
    const trafficFraction = experimentsDefinitions[name].trafficFraction;

    sixpack().participate(
      name,
      alternatives,
      trafficFraction,
      (error, response) => {
        if (error) {
          reject(error);
        }

        resolve(response.alternative.name);
      },
    );
  });
}

export function participateBeta(experimentName, alternatives = []) {
  console.log('♨️');
  console.log(experimentName);
  console.log(alternatives);

  return new Promise((resolve, reject) => {
    sixpack().participate(experimentName, alternatives, (error, response) => {
      if (error) {
        reject(error);
      }

      resolve(response.alternative.name);
    });
  });
}

/**
 * Convert current client on specified experiment.
 *
 * @param  {String} name
 * @return {Promise}
 */
export function convert(name) {
  return new Promise((resolve, reject) => {
    sixpack().convert(name, (error, response) => {
      console.groupCollapsed(
        '%c Sixpack: %c Triggered event "%s"',
        'background-color: #e2ccff; display: block; font-weight: bold; line-height: 1.5;',
        'background-color: transparent; font-weight: normal; line-height: 1.5;',
      );
      console.log('Error:', error);
      console.log('Response:', response);
      console.groupEnd();

      if (error) {
        reject(error);
      }

      resolve(response);
    });
  });
}
