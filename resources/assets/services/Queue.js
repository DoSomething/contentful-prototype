/* global window */

import localforage from 'localforage';

class Queue {
  constructor() {
    this.key = 'phoenix_queue';

    localforage.getItem(this.key).then(value => {
      if (!value) {
        this.reset();
      }
    });

    window.DS = window.DS || {};
    window.DS.Queue = this;
  }

  enqueue(data) {
    return localforage.getItem(this.key).then(value => {
      value.push(data);

      return localforage.setItem(this.key, value);
    });
  }

  getTotal() {
    return localforage.getItem(this.key).then(value => value.length);
  }

  processQueue(callback) {
    localforage.getItem(this.key).then(queue => {
      if (!Array.isArray(queue)) {
        return;
      }

      this.reset();

      queue.forEach(item => callback(item));
    });
  }

  reset() {
    return localforage.setItem(this.key, []);
  }
}

export default Queue;
