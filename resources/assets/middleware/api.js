/* global window */

import { RestApiClient } from '@dosomething/gateway';

import { API } from '../constants/action-types';
import { PHOENIX_URL } from '../constants';

/**
 * Middleware for handling API actions.
 */
const apiMiddleware = () => next => (action) => {
  if (action.type !== API) {
    return next(action);
  }

  const { payload } = action;

  const client = new RestApiClient(PHOENIX_URL);

  if (window.ENV.APP_ENV !== 'production') {
    client.get(payload.url, payload.query)
      .then((response) => {
        // @TODO: more to come with handling the response!
        if (response.data) {
          console.table(response.data);
        } else {
          console.log('Nope, nothing to see here for now...');
        }
      });
  }

  return next(action);
};

export default apiMiddleware;
