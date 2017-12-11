const apiMiddleware = ({ getState, dispatch }) => next => action => {
  next(action);
};

export default apiMiddleware;
