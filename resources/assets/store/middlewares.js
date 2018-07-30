import apiMiddleware from '../middleware/api';
import analyticsMiddleware from '../middleware/analytics';
import experimentsMiddleware from '../middleware/experiments';

const middlewares = [analyticsMiddleware, apiMiddleware, experimentsMiddleware];

export default middlewares;
