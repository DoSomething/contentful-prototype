/* global window */

import { googleLog, snowplowLog } from '../helpers/loggers';

const KEY = 'DS_SHOW_LOGS';

class Debug {
  constructor(loggers = []) {
    this.showLogs = Boolean(Debug.getToggleValue());

    this.loggers = ['google', 'sixpack', 'snowplow'];

    window.DS = window.DS || {};
    window.DS.Debug = this;

    this.logExistingDataLayerEvents();
  }

  /**
   * Get the toggle logs boolean value from local storage.
   *
   * @return {Number}
   */
  static getToggleValue() {
    return Number(localStorage.getItem(KEY));
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

    switch (type) {
      case 'google':
        googleLog(data);
        break;

      case 'snowplow':
        snowplowLog(data);
        break;

      default:
        console.error('No custom log formatter specified.');
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
      this.log('google', window.dataLayer[item]);
    });
  }

  /**
   * Toggle whether to show or hide the DoSomething Debug logs in the console.
   *
   * @return {void}
   */
  toggleLogs() {
    const currentValue = Debug.getToggleValue();

    const updatedValue = Number(!currentValue);

    localStorage.setItem(KEY, updatedValue);

    this.showLogs = Boolean(updatedValue);

    this.setupTrackerWrappers();

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
