import apiMiddleware from '../middleware/api';
import analyticsMiddleware from '../middleware/analytics';
import experimentsMiddleware from '../middleware/experiments';
import experimentsApiMiddleware from '../middleware/experimentsApi';

const middlwares = [
  analyticsMiddleware,
  apiMiddleware,
  experimentsApiMiddleware,
  experimentsMiddleware,
];

export default middlwares;
