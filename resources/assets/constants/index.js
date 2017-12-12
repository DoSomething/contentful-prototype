/* global window */
import { get } from 'lodash';

/**
 * Contains general constants for the application.
 */

export const MEDIA_MEDIUM_SIZE_MIN = 759;

export const PHOENIX_URL = get(window.ENV, 'PHOENIX_URL', null);
