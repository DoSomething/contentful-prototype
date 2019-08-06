/* global window */

import { googleLog, snowplowLog } from '../helpers/loggers';

const STORAGE_LOGGERS_KEY = 'DS_ENABLED_LOGGERS';

class Debug {
  constructor() {
    this.enabledLoggers = Debug.getEnabledLoggers();

    window.DS = window.DS || {};
    window.DS.Debug = this;

    // @TODO: call this once once document is ready?
    // this.logExistingDataLayerEvents();
  }

  /**
   * Get list of enabled loggers from local storage.
   *
   * @return {Array}
   */
  static getEnabledLoggers() {
    return JSON.parse(localStorage.getItem(STORAGE_LOGGERS_KEY)) || [];
  }

  /**
   * Get styles for console log message.
   *
   * @return {String}
   */
  static getMessageStyles() {
    return `
    background-color: #141493;
    color: #fafafa;
    display: block;
    font-size: 14px;
    line-height: 1.5;
    padding: 20px 30px;
  `;
  }

  /**
   * Set list of enalbed loggers into local storage.
   *
   * @param  {Array} specifiedLogs
   * @return {undefined}
   */
  static setEnabledLoggers(specifiedLogs) {
    localStorage.setItem(STORAGE_LOGGERS_KEY, JSON.stringify(specifiedLogs));
  }

  /**
   * Log data in the console with a specified log formatter function
   * based on the specified event type.
   *
   * @param  {String} type
   * @param  {Array|Object} data
   * @return {undefined}
   */
  log(type, data) {
    if (!this.enabledLoggers.includes(type)) {
      return;
    }

    switch (type) {
      case 'google':
        googleLog(data);
        break;

      case 'snowplow':
        snowplowLog(data);
        break;

      default:
        console.error('No custom log formatter found.');
    }
  }

  /**
   * Log any initial events already in the GTM dataLayer array.
   *
   * @return {undefined}
   */
  logExistingDataLayerEvents() {
    if (!this.enabledLoggers.includes('google')) {
      return;
    }

    const events = Object.keys(window.dataLayer);

    events.forEach(item => {
      if (typeof window.dataLayer[item] === 'function') {
        return;
      }

      this.log('google', window.dataLayer[item]);
    });
  }

  /**
   * Enable showing the specified logs.
   *
   * @param  {Array} specifiedLogs
   * @return {undefined}
   */
  enableLogs(specifiedLogs) {
    if (!Array.isArray(specifiedLogs)) {
      return console.error(
        'To enable showing logs, please provide an array of string names of the logs to show.',
      );
    }

    Debug.setEnabledLoggers(specifiedLogs);

    this.enabledLoggers = Debug.getEnabledLoggers();

    const logs = specifiedLogs.join(', ');

    console.log(
      `%c📝 DoSomething logs have been turned ON.`,
      Debug.getMessageStyles(),
    );

    console.log(`%c✅ Showing logs for ${logs}.`, Debug.getMessageStyles());

    return;
  }

  /**
   * Disable showing any logs.
   *
   * @return {undefined}
   */
  disableLogs() {
    Debug.setEnabledLoggers([]);

    this.enabledLoggers = Debug.getEnabledLoggers();

    return console.log(
      '%c📝 DoSomething logs have been turned OFF.',
      Debug.getMessageStyles(),
    );
  }
}

export default Debug;
