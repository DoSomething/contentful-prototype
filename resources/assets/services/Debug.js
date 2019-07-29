/* global window */

import { isStaff } from '../helpers';
import { googleLog, snowplowLog } from '../helpers/loggers';

const KEY = 'DS_SHOW_LOGS';

class Debug {
  constructor() {
    this.showLogs = Boolean(Debug.getToggleValue());

    window.DS = window.DS || {};
    window.DS.Debug = this;
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
   * @return {void}
   */
  log(type, ...args) {
    if (!this.showLogs) {
      return;
    }

    switch (type) {
      case 'google':
        googleLog(type, ...args);
        break;

      case 'snowplow':
        snowplowLog(type, ...args);
        break;

      default:
        console.error('No custom log formatter specified.');
    }
  }

  /**
   * Wrap specified event trackers in a custom fu nction to allow logging
   * when events fire into the console for debugging.
   *
   * @return {void}
   */
  setupTrackerWrappers() {
    if (typeof window.snowplow !== 'function') {
      return;
    }

    const debug = this;

    // Wrap the Snowplow function to allow logging events.
    const nativeSnowplow = window.snowplow;

    window.snowplow = function() {
      // Do not use rest params for these wrappers since it would convert the prototype object
      // from an Object to an Array and potentially disable the native functionality!
      nativeSnowplow.call(window, ...arguments); // eslint-disable-line prefer-rest-params
      debug.log('snowplow', ...arguments); // eslint-disable-line prefer-rest-params
    };

    // Wrap the Google Tag Manager dataLayer push function to allow logging events.
    const nativeGtmDataLayerPush = window.dataLayer.push;

    window.dataLayer.push = function() {
      nativeGtmDataLayerPush.call(window, ...arguments); // eslint-disable-line prefer-rest-params
      debug.log('google', ...arguments); // eslint-disable-line prefer-rest-params
    };
  }

  /**
   * Toggle whether to show or hide the DoSomething Debug logs in the console.
   *
   * @return {void}
   */
  toggleLogs() {
    const toggle = Debug.getToggleValue();

    if (!isStaff() && !toggle) {
      return console.warn('Sorry friend, you are not authorized.');
    }

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
