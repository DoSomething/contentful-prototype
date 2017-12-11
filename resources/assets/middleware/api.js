const apiMiddleware = () => next => (action) => {
  next(action);
};

export default apiMiddleware;
