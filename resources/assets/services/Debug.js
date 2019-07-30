/* global window */

import { googleLog, snowplowLog } from '../helpers/loggers';

const KEY = 'DS_SHOW_LOGS';

class Debug {
  constructor() {
    this.showLogs = Boolean(Debug.getToggleValue());

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
    // Note: if GTM is not active, no initial events will be pushed to the mocked dataLayer array.
    const events = Object.keys(window.dataLayer);

    events.forEach(item => {
      if (typeof window.dataLayer[item] === 'function') {
        return;
      }
      this.log('google', window.dataLayer[item]);
    });
  }

  /**
   * Wrap specified event trackers in a custom fu nction to allow logging
   * when events fire into the console for debugging.
   *
   * @return {void}
   */
  setupTrackerWrappers() {
    this.wrapGoogleTracker();

    this.wrapSnowplowTracker();
  }

  /**
   * Wrap the Google Tag Manager dataLayer push function to allow logging events.
   *
   * @return {void}
   */
  wrapGoogleTracker() {
    if (!Array.isArray(window.dataLayer)) {
      return;
    }

    const debug = this;

    const nativeGtmDataLayerPush = window.dataLayer.push;

    window.dataLayer.push = function(...args) {
      nativeGtmDataLayerPush.apply(window.dataLayer, args);

      debug.log('google', args[0]);
    };
  }

  /**
   * Wrap the Snowplow function to allow logging events.
   *
   * @return {void}
   */
  wrapSnowplowTracker() {
    if (typeof window.snowplow !== 'function') {
      return;
    }

    const debug = this;

    const nativeSnowplow = window.snowplow;

    window.snowplow = function(...args) {
      nativeSnowplow.apply(window, args);

      debug.log('snowplow', args);
    };
  }

  /**
   * Toggle whether to show or hide the DoSomething Debug logs in the console.
   *
   * @return {void}
   */
  toggleLogs() {
    const toggle = Debug.getToggleValue();

    localStorage.setItem(KEY, Number(!toggle));

    const messageStyles = `
          background-color: #141493;
          color: #fafafa;
          display: block;
          font-size: 14px;
          padding: 20px 30px;
        `;

    this.showLogs = Boolean(Debug.getToggleValue());

    return console.log(
      `%c📝 DoSomething logs have been turned ${!toggle ? 'ON' : 'OFF'}.`,
      messageStyles,
    );
  }
}

export default Debug;
