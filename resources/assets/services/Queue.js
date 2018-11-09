/* global window */

import localforage from 'localforage';

class Queue {
  constructor() {
    localforage.getItem(this.key).then(value => {
      if (!value) {
        this.reset();
      }
    });

    window.DS = window.DS || {};
    window.DS.Queue = this;
  }

  key = 'phoenix_queue';

  dequeue() {}

  enqueue(data) {
    return localforage.getItem(this.key).then(value => {
      console.log('🙇🏽', value);

      value.push(data);

      return localforage.setItem(this.key, value);
    });

    // window.location.href = payload.meta.redirectUrl;
    // console.log('💫 go to Northstar login...');
  }

  reset() {
    return localforage.setItem(this.key, []);
  }
}

export default Queue;
