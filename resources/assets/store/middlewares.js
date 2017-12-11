import experimentsMiddleware from '../middleware/experiments';
import experimentsApiMiddleware from '../middleware/experimentsApi';

const middlwares = [
  experimentsApiMiddleware,
  experimentsMiddleware,
];

export default middlwares;
