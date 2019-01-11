import apiMiddleware from '../middleware/api';
import analyticsMiddleware from '../middleware/analytics';
import sixpackExperimentsMiddleware from '../middleware/sixpackExperiments';
import requiresAuthenticationMiddleware from '../middleware/requiresAuthentication';

const middlewares = [
  analyticsMiddleware,
  sixpackExperimentsMiddleware,
  requiresAuthenticationMiddleware,
  apiMiddleware,
];

export default middlewares;
