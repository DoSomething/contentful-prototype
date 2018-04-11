/* global window */

import { RestApiClient } from '@dosomething/gateway';

import { API } from '../constants/action-types';
import { PHOENIX_URL } from '../constants';

/**
 * Send a GET request.
 *
 * @param  {Object} payload
 * @return {void}
 */
const getRequest = payload => {
  const client = new RestApiClient(PHOENIX_URL);

  if (window.ENV.APP_ENV !== 'production') {
    client.get(payload.url, payload.query).then(response => {
      // @TODO: more to come with handling the response!
      if (response && response.data) {
        console.groupCollapsed(
          '%c API Middleware Response: ',
          'background-color: rgba(137,161,188,0.5); color: rgba(33,70,112,1); display: block; font-weight: bold; line-height: 1.5;',
        );
        console.table(response.data);
        console.groupEnd();
      } else {
        console.log('Nope, nothing to see here for now...');
      }
    });
  }
};

/**
 * Send a POST request.
 *
 * @param  {Object} payload
 * @return {Object}
 */
const postRequest = (payload, dispatch) => {
  const client = new RestApiClient(PHOENIX_URL, {
    headers: {
      Authorization: `Bearer ${payload.token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  dispatch({ type: payload.pending });

  return client
    .post(payload.url, payload.body)
    .then(response => {
      console.log('✅ successful response!');

      response.status = {
        success: {
          code: 201,
          message: 'Thanks for your submission!',
        },
      };

      dispatch({
        meta: payload.meta,
        response,
        type: payload.success,
      });
    })
    .catch(error => {
      console.log('🚫 failed response; caught the error!');
      const response = error.response;

      dispatch({
        meta: payload.meta,
        response,
        type: payload.failure,
      });
    });
};

/**
 * Middleware for handling API actions.
 */
const apiMiddleware = ({ dispatch }) => next => action => {
  if (action.type !== API) {
    return next(action);
  }

  const { payload } = action;

  switch (action.method) {
    case 'GET':
      getRequest(payload, dispatch);
      break;

    case 'POST':
      postRequest(payload, dispatch);
      break;

    default:
      // @TODO: is a console error fine? or should we throw an Error that the
      // method is not supported or incorrect?
      console.error(
        `The "${action.method}" method is not supported or incorrect!`,
      );
  }

  return next(action);
};

export default apiMiddleware;
