import { isArray, mergeWith } from 'lodash';

import { query } from './url';

/**
 * Determine if the user is a scholarship affiliate referral.
 *
 * @return {Boolean}
 */
export function isScholarshipAffiliateReferral() {
  const utmSource = query('utm_source');

  return utmSource && utmSource.includes('scholarship');
}

/**
 * Get the Scholarship Affiliate Referrer's UTM Label.
 *
 * @return {String|Null}
 */
export function getScholarshipAffiliateLabel() {
  const utmCampaign = query('utm_campaign') || '';

  // The affiliate's UTM Label is expected to be the first value of a snake cased string.
  const utmLabel = utmCampaign.split('_')[0];

  // If the utm_source contains 'scholarship', we assume this visit to be a referral from a
  // scholarship affiliate and return the affiliate's UTM label.
  return isScholarshipAffiliateReferral() ? utmLabel : null;
}

/**
 * Merge paginated GraphQL queries.
 *
 * @param {Object} previous
 * @param {Object} [fetchMoreResult]
 */
export function updateQuery(previous, { fetchMoreResult }) {
  return mergeWith({}, previous, fetchMoreResult, (dest, src) =>
    // By default, Lodash's `merge` would try to merge *each* array
    // item (e.g. `edges[0]` with then next page's `edges[0]`).
    isArray(dest) ? [...dest, ...src] : undefined,
  );
}
