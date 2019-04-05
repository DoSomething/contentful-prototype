/* global window */

class QueryObserver {
  constructor() {
    window.DS = window.DS || {};
    window.DS.QueryObserver = this;
  }

  pendingQueries = [];

  add = id => this.pendingQueries.push(id);

  remove = id => this.pendingQueries.splice(this.pendingQueries.indexOf(id), 1);

  isLoading = () => this.pendingQueries.length;
}

export default QueryObserver;
