import apiMiddleware from '../middleware/api';
import analyticsMiddleware from '../middleware/analytics';
import sixpackExperimentsMiddleware from '../middleware/sixpackExperiments';

const middlewares = [
  analyticsMiddleware,
  apiMiddleware,
  sixpackExperimentsMiddleware,
];

export default middlewares;
