/* global window */
import { get } from 'lodash';

/**
 * Contains general constants for the application.
 */
export const MEDIA_MEDIUM_SIZE_MIN = 759;

export const PHOENIX_URL = get(window.ENV, 'PHOENIX_URL', null);

export const PUCK_URL = get(window.ENV, 'PUCK_URL', null);

// Apollo GraphQL loading states:
export const NetworkStatus = {
  LOADING: 1,
  SET_VARIABLES: 2,
  FETCH_MORE: 3,
  REFETCH: 4,
  POLL: 6,
  READY: 7,
  ERROR: 8,
};
