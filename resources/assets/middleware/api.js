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
        if (response && response.data) {
          console.groupCollapsed('%c API Middleware Response: ',
            'background-color: rgba(137,161,188,0.5); color: rgba(33,70,112,1); display: block; font-weight: bold; line-height: 1.5;',
          );
          console.table(response.data);
          console.groupEnd();
        } else {
          console.log('Nope, nothing to see here for now...');
        }
      });
  }

  return next(action);
};

export default apiMiddleware;
