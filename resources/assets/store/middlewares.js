import apiMiddleware from '../middleware/api';
import analyticsMiddleware from '../middleware/analytics';
import sixpackExperimentsMiddleware from '../middleware/sixpackExperiments';
import requiresAuthenticationMiddleware from '../middleware/requiresAuthentication';

const middlewares = [
  requiresAuthenticationMiddleware,
  analyticsMiddleware,
  apiMiddleware,
  sixpackExperimentsMiddleware,
];

export default middlewares;
