/* global window FormData */

import { get } from 'lodash';
import { RestApiClient } from '@dosomething/gateway';

import { report } from '../helpers';
import { PHOENIX_URL } from '../constants';
import { setFormData } from '../helpers/forms';
import { API } from '../constants/action-types';
import { getUserToken } from '../selectors/user';
import { trackPuckEvent } from '../helpers/analytics';
import { getRequest, setRequestHeaders } from '../helpers/api';

/**
 * Console log a table of data.
 *
 * @param  {Array} data
 * @return {void}
 * @todo   Move this to a dedicated Debugger or Logger service class.
 */
function tabularLog(data) {
  if (!data) {
    return;
  }

  // Console log response Data for debugging.
  if (window.ENV.APP_ENV !== 'production') {
    console.groupCollapsed(
      '%c API Middleware Response: ',
      'background-color: rgba(137,161,188,0.5); color: rgba(33,70,112,1); display: block; font-weight: bold; line-height: 1.5;',
    );
    console.table(data);
    console.groupEnd();
  }
}

/**
 * Send a GET request and dispatch actions.
 *
 * @param  {Object} payload
 * @param  {Function} dispatch
 * @return {void}
 */
const getRequestAction = (payload, dispatch) => {
  dispatch({ type: payload.pending });

  return getRequest(payload.url, payload.query)
    .then(response => {
      tabularLog(get(response, 'data', null));

      dispatch({
        meta: get(payload, 'meta', {}),
        response,
        type: payload.success,
      });
    })
    .catch(error => {
      if (window.ENV.APP_ENV !== 'production') {
        console.log('🚫 failed response? caught the error!', error);
      }

      dispatch({
        response: error.response,
        type: payload.failure,
      });
    });
};

/**
 * Send a POST request and dispatch actions.
 *
 * @param  {Object} payload
 * @param  {Function} dispatch
 * @return {Object}
 * @todo   rename to postRequestAction
 */
const postRequest = (payload, dispatch, getState) => {
  const token = getUserToken(getState()) || window.AUTH.token;

  const client = new RestApiClient(PHOENIX_URL, {
    headers: setRequestHeaders({ token, contentType: 'multipart/form-data' }),
  });

  const body =
    payload.body instanceof FormData ? payload.body : setFormData(payload.body);

  dispatch({
    id: payload.meta.id,
    type: payload.pending,
  });

  return client
    .post(payload.url, body)
    .then(response => {
      tabularLog(get(response, 'data', null));

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
      report(error);
      trackPuckEvent('phoenix_failed_post_request', {
        url: payload.url,
        error,
      });
      if (window.ENV.APP_ENV !== 'production') {
        console.log('🚫 failed response? caught the error!', error);
      }

      dispatch({
        meta: payload.meta,
        response: error.response,
        type: payload.failure,
      });
    });
};

/**
 * Middleware for handling API actions.
 */
const apiMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type !== API) {
    return next(action);
  }

  const { payload } = action;

  switch (action.method) {
    case 'GET':
      getRequestAction(payload, dispatch);
      break;

    case 'POST':
      postRequest(payload, dispatch, getState);
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
