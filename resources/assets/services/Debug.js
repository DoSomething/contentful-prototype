/* global window */

import { isStaff } from '../helpers';
import { googleLog, snowplowLog } from '../helpers/loggers';

const KEY = 'DS_SHOW_LOGS';

class Debug {
  constructor() {
    this.showLogs = Boolean(this.getToggleValue());

    window.DS = window.DS || {};
    window.DS.Debug = this;
  }

  /**
   * [toggleLogs description]
   * @return {[type]} [description]
   */
  toggleLogs() {
    const toggle = this.getToggleValue();

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

    this.showLogs = Boolean(this.getToggleValue());

    console.log(
      `%c📝 DoSomething logs have been turned ${!toggle ? 'ON' : 'OFF'}.`,
      messageStyles,
    );
  }

  /**
   * [getToggleValue description]
   * @return {[type]} [description]
   */
  getToggleValue() {
    return Number(localStorage.getItem(KEY));
  }

  /**
   * [log description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  log(type) {
    if (!this.showLogs) {
      return;
    }

    switch (type) {
      case 'google':
        googleLog(...arguments);
        break;

      case 'snowplow':
        snowplowLog(...arguments);
        break;

      default:
        console.error('No custom log formatter specified.');
    }
  }

  /**
   * [setupWrappers description]
   * @return {[type]} [description]
   */
  setupWrappers() {
    if (typeof window.snowplow !== 'function') {
      return;
    }

    const debug = this;

    // Wrap the Snowplow function to allow logging events.
    const nativeSnowplow = window.snowplow;

    window.snowplow = function() {
      nativeSnowplow.call(window, ...arguments);
      debug.log('snowplow', ...arguments);
    };

    // Wrap the Google Tag Manager dataLayer push function to allow logging events.
    const nativeGtmDataLayerPush = window.dataLayer.push;

    window.dataLayer.push = function() {
      nativeGtmDataLayerPush.call(window, ...arguments);
      debug.log('google', ...arguments);
    };
  }
}

export default Debug;
