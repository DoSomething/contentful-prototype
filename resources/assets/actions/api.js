import { API } from '../constants/action-types';

/**
 * API request action creator
 * @param  {Object} data
 * @return {Object}
 */
export default function apiRequest(method, payload) {
  // @TODO: check if supplied arguments are ok!
  return ({
    type: API,
    method,
    payload,
  });
}
