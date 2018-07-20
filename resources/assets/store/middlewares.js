import apiMiddleware from '../middleware/api';
import analyticsMiddleware from '../middleware/analytics';
import experimentsMiddleware from '../middleware/experiments';

const middlwares = [analyticsMiddleware, apiMiddleware, experimentsMiddleware];

export default middlwares;
