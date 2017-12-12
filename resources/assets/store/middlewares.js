import apiMiddleware from '../middleware/api';
import experimentsMiddleware from '../middleware/experiments';
import experimentsApiMiddleware from '../middleware/experimentsApi';

const middlwares = [
  apiMiddleware,
  experimentsApiMiddleware,
  experimentsMiddleware,
];

export default middlwares;
