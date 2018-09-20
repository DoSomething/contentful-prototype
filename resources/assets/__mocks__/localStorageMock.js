// Mocking local storage for tests
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  clear() {
    this.store = {};
  }
}

export default LocalStorageMock;
