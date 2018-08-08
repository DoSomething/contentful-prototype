/* global window */

import client from 'sixpack-client';

import {
  SIXPACK_EXPERIMENT_SIGNUP_ACTION,
  SIXPACK_EXPERIMENT_REPORTBACK_POST_ACTION,
  SIXPACK_EXPERIMENT_CLICKED_BUTTON_ACTION,
} from '../constants';
import { sixpackLog } from '../helpers/loggers';

class Sixpack {
  constructor() {
    this.reset();

    const env = window.ENV || {};

    if (!env.SIXPACK_BASE_URL) {
      throw new Error('Missing Sixpack configuration settings.');
    }

    this.client = new client.Session({
      base_url: env.SIXPACK_BASE_URL,
      cookie_name: env.SIXPACK_COOKIE_PREFIX || 'sixpack',
    });
  }

  conversions = [
    SIXPACK_EXPERIMENT_SIGNUP_ACTION,
    SIXPACK_EXPERIMENT_REPORTBACK_POST_ACTION,
    SIXPACK_EXPERIMENT_CLICKED_BUTTON_ACTION,
  ];

  experiments = {};

  /**
   * Add experiment and supplied values to the experiments list.
   *
   * @param {String} experimentName
   * @param {Object} experimentSettings
   */
  addExperiment(experimentName, experimentSettings) {
    const values = experimentSettings;

    if (!values.convertableActions || !values.convertableActions.length) {
      values.convertableActions = this.conversions;
    }

    this.experiments[experimentName] = { ...values };
  }

  /**
   * Convert on specified experiment name.
   *
   * @param  {String} experimentName
   * @return {Promise}
   */
  convert(experimentName) {
    const kpi = this.experiments[experimentName].kpi;

    return new Promise((resolve, reject) => {
      this.client.convert(experimentName, kpi, (error, response) => {
        if (error) {
          reject(error);
        }

        sixpackLog(
          this.client,
          'convert',
          experimentName,
          this.experiments[experimentName],
        );

        resolve(response);
      });
    });
  }

  /**
   * Convert all available experiments that match a specified convertable action.
   *
   * @param  {String} action
   * @return {Void}
   */
  convertOnAction(action) {
    const matchingExperiments = Object.keys(this.experiments).filter(
      experimentName =>
        this.experiments[experimentName].convertableActions.includes(action),
    );

    matchingExperiments.forEach(experimentName => this.convert(experimentName));
  }

  /**
   * Participate in specified experiment.
   *
   * @param  {String} experimentName
   * @param  {Array}  testAlternatives
   * @param  {Object} options
   * @return {Promise}
   */
  participate(experimentName, testAlternatives = [], options = {}) {
    return new Promise((resolve, reject) => {
      this.client.participate(
        experimentName,
        testAlternatives,
        (error, response) => {
          if (error) {
            reject(error);
          }

          this.addExperiment(experimentName, {
            selectedAlternative: response.alternative.name,
            ...options,
          });

          sixpackLog(
            this.client,
            'participate',
            experimentName,
            this.experiments[experimentName],
          );

          resolve(response.alternative.name);
        },
      );
    });
  }

  /**
   * Reset the list of experiments.
   *
   * @return {Void}
   */
  reset() {
    this.experiments = {};
  }
}

export default Sixpack;
