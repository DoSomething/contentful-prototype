const setFBshare = (shouldBeSuccessful) => {
  global.FB = {
    ui: (share, callback) => {
      callback(shouldBeSuccessful);
    }
  }
}

export default setFBshare;
