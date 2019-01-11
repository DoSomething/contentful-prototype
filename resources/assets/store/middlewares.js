import apiMiddleware from '../middleware/api';
import analyticsMiddleware from '../middleware/analytics';
import sixpackExperimentsMiddleware from '../middleware/sixpackExperiments';
import requiresAuthenticationMiddleware from '../middleware/requiresAuthentication';

const middlewares = [
  // Event data collection for analysis needs to execute first.
  analyticsMiddleware,
  sixpackExperimentsMiddleware,

  // Authentication executes after event data collection, since it could redirect user out of app.
  requiresAuthenticationMiddleware,

  // User requests and activity execute last.
  apiMiddleware,
];

export default middlewares;
