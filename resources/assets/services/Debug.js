/* global window */

import { googleLog, snowplowLog } from '../helpers/loggers';

const STORAGE_TOGGLE_KEY = 'DS_SHOW_LOGS';
const STORAGE_LOGGERS_KEY = 'DS_ENABLED_LOGGERS';

class Debug {
  constructor() {
    this.showLogs = Boolean(Debug.getToggleValue());

    this.enabledLoggers = Debug.getEnabledLoggers();

    window.DS = window.DS || {};
    window.DS.Debug = this;

    this.logExistingDataLayerEvents();
  }

  static getEnabledLoggers() {
    return JSON.parse(localStorage.getItem(STORAGE_LOGGERS_KEY)) || [];
  }

  /**
   * Get the toggle logs boolean value from local storage.
   *
   * @return {Number}
   */
  static getToggleValue() {
    return Number(localStorage.getItem(STORAGE_TOGGLE_KEY));
  }

  /**
   * Log data in the console with a specified log formatter function
   * based on the specified event type.
   *
   * @param  {String} type
   * @param  {Array|Object} data
   * @return {void}
   */
  log(type, data) {
    if (!this.showLogs) {
      return;
    }

    if (!this.enabledLoggers.includes(type)) {
      return;
    }

    switch (type) {
      case 'google':
        googleLog(data[0]);
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
   * @return {void}
   */
  logExistingDataLayerEvents() {
    if (!Debug.getToggleValue()) {
      return;
    }

    const events = Object.keys(window.dataLayer);

    events.forEach(item => {
      if (typeof window.dataLayer[item] === 'function') {
        return;
      }

      this.log('google', [window.dataLayer[item]]);
    });
  }

  /**
   * Toggle whether to show or hide the DoSomething Debug logs in the console.
   *
   * @return {void}
   */
  toggleLogs(specifiedLogs = []) {
    const currentValue = Debug.getToggleValue();

    const updatedValue = Number(!currentValue);

    localStorage.setItem(STORAGE_TOGGLE_KEY, updatedValue);

    // If toggling logs off, then set item to empty array, otherwise the array of logs specified.
    localStorage.setItem(
      STORAGE_LOGGERS_KEY,
      JSON.stringify(!updatedValue ? [] : specifiedLogs),
    );

    this.showLogs = Boolean(updatedValue);
    this.enabledLoggers = Debug.getEnabledLoggers();

    const messageStyles = `
          background-color: #141493;
          color: #fafafa;
          display: block;
          font-size: 14px;
          padding: 20px 30px;
        `;

    return console.log(
      `%c📝 DoSomething logs have been turned ${updatedValue ? 'ON' : 'OFF'}.`,
      messageStyles,
    );
  }
}

export default Debug;
