const setFBshare = shouldBeSuccessful => {
  global.FB = {
    ui: jest.fn((share, callback) => {
      callback(shouldBeSuccessful);
    }),
  };
};

export default setFBshare;
