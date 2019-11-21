/* global window */

import { join } from 'path';
import { get } from 'lodash';
import gql from 'graphql-tag';
import { RestApiClient } from '@dosomething/gateway';

import { PHOENIX_URL } from '../constants';

/**
 * Set properties for request headers object.
 *
 * @param  {Object} options
 * @return {Object}
 */
export function setRequestHeaders(options = {}) {
  const headers = {};

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`; // eslint-disable-line dot-notation
  }

  headers['Content-Type'] = options.contentType
    ? options.contentType
    : 'application/json';

  return headers;
}

/**
 * Console log a table of data.
 *
 * @param  {Array} data
 * @return {void}
 * @todo   Move this to a dedicated Debugger or Logger service class.
 */
export function tabularLog(data) {
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
 * Send a GET request.
 *
 * @param  {String} url
 * @param  {Object} query
 * @return {Object}
 */
export function getRequest(url, query) {
  const client = new RestApiClient(PHOENIX_URL, {
    headers: setRequestHeaders({ token: window.AUTH.token }),
  });

  return client.get(url, query).then(response => {
    tabularLog(get(response, 'data', null));

    return response;
  });
}

/**
 * Send a POST request.
 *
 * @param  {String} url
 * @param  {Object} query
 * @param  {String} token
 * @return {Object}
 */
export function postRequest(url, query, token) {
  const client = new RestApiClient(PHOENIX_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return client.post(url, query).then(response => {
    tabularLog(get(response, 'data', null));

    return response;
  });
}

/**
 * Get campaign signups for a user.
 *
 * @param  {String} userId
 * @param  {String} campaignId
 * @param  {String|Null} campaignRunId
 * @return {Object}
 */
export function getUserCampaignSignups(
  userId,
  campaignId,
  campaignRunId = null,
) {
  const path = join('api/v2/campaigns', campaignId, 'signups');

  return getRequest(`${PHOENIX_URL}/${path}`, {
    filter: {
      northstar_id: userId,
      campaign_run_id: campaignRunId,
    },
  });
}

/**
 * Get specified Contentful block entry.
 *
 * @param  {String}
 * @return {Object}
 */
export function getBlock(id) {
  const path = join('api/v2/blocks', id);

  return getRequest(`${PHOENIX_URL}/${path}`);
}

/**
 * Returns given user school ID if the given action should collect school ID.
 *
 * @param {String} userId
 * @param {Number} actionId
 * @return {Promise}
 */
export async function getUserActionSchoolId(graphqlClient, userId, actionId) {
  const query = gql`
    query ActionAndUserByIdQuery($actionId: Int!, $userId: String!) {
      action(id: $actionId) {
        collectSchoolId
      }
      user(id: $userId) {
        schoolId
      }
    }
  `;

  const result = await graphqlClient.query({
    query,
    variables: { userId, actionId },
  });

  // @TODO: Don't return user school ID if set to unavailable.
  return result.data.action.collectSchoolId ? result.data.user.schoolId : null;
}
