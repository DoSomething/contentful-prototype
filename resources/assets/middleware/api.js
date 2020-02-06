/* global window FormData */

import { get } from 'lodash';
import { RestApiClient } from '@dosomething/gateway';

import { report, isWithinMinutes } from '../helpers';
import { PHOENIX_URL } from '../constants';
import { API } from '../constants/action-types';
import { getUserToken } from '../selectors/user';
import { getRequest, setRequestHeaders, tabularLog } from '../helpers/api';
import { formatEventNoun, trackAnalyticsEvent } from '../helpers/analytics';

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
      report(error);

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
 * @todo   rename to postRequestAction and refactor to use helpers/api@postRequest().
 */
const postRequest = (payload, dispatch, getState) => {
  const token = getUserToken(getState()) || window.AUTH.token;

  const contentType =
    payload.body instanceof FormData
      ? 'multipart/form-data'
      : 'application/json';

  const client = new RestApiClient(PHOENIX_URL, {
    headers: setRequestHeaders({ token, contentType }),
  });

  const actionId = get(payload, 'meta.actionId', null);
  const blockId = get(payload, 'meta.id', null); // @TODO: id will be renamed to blockId in future.
  const campaignId = get(payload, 'meta.campaignId');
  const pageId = get(payload, 'meta.pageId', null);
  const postType = get(payload, 'meta.type', 'post_request');

  dispatch({
    id: payload.meta.id,
    type: payload.pending,
  });

  return client
    .post(payload.url, payload.body)
    .then(response => {
      tabularLog(get(response, 'data', null));

      // @TODO: Not ideal. We would prefer to know the status code from response to know
      // if data was created or not, but Gateway doesn't currently pass this to us. So for
      // now we're resolving to check against the data's created_at value to decide time elapsed.
      const dataCreatedAt = get(response, 'data.created_at', null);
      const statusCode = isWithinMinutes(dataCreatedAt, 2) ? 201 : 200;

      response.status = {
        success: {
          code: statusCode,
          message: get(payload, 'meta.messaging.success', 'Thanks!'),
        },
      };

      const verb =
        statusCode === 200 && postType === 'signup' ? 'found' : 'completed';

      trackAnalyticsEvent(`${verb}_${formatEventNoun(postType)}`, {
        action: `${postType}_${verb}`,
        category: 'campaign_action',
        label: campaignId || formatEventNoun(postType), // @TODO: make this the campaign title if available; but also may need to get passed in as an argument.
        context: {
          actionId,
          activityId: response.data.id,
          blockId,
          campaignId,
          pageId,
        },
      });

      dispatch({
        meta: payload.meta,
        response,
        type: payload.success,
      });
    })
    .catch(error => {
      report(error);

      trackAnalyticsEvent(`failed_${formatEventNoun(postType)}`, {
        action: `${postType}_failed`,
        category: 'campaign_action',
        label: campaignId || formatEventNoun(postType), // @TODO: make this the campaign title if available; but also may need to get passed in as an argument.
        context: {
          actionId,
          blockId,
          campaignId,
          error,
          pageId,
        },
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
