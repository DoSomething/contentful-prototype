import { get } from 'lodash';

import { sixpack } from '../helpers';

const sixpackExperimentsMiddleware = () => next => action => {
  const convertableActionName = get(
    action,
    'payload.meta.sixpackExperiments.conversion',
    null,
  );

  if (!convertableActionName) {
    return next(action);
  }

  sixpack().convertOnAction(convertableActionName);

  return next(action);
};

export default sixpackExperimentsMiddleware;
