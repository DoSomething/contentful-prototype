const apiMiddleware = ({ getState, dispatch }) => next => action => {
  console.log(action.type);
  next(action);
  console.log(action.type);
};

export default apiMiddleware;
