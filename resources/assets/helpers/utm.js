import { query } from '.';

/**
 * Get UTM parameters.
 *
 * @return {Object}
 */
export function getUtmParameters() {
  return {
    utm_source: query('utm_source'),
    utm_medium: query('utm_medium'),
    utm_campaign: query('utm_campaign'),
  };
}

export default null;
