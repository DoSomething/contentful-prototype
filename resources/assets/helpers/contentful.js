import { get } from 'lodash';

import { withoutNulls } from './data';
import { appendToQuery } from './url';

/**
 * Generate a Contentful Image URL with added url parameters.
 *
 * @param  {String} url
 * @param  {String} width
 * @param  {String} height
 * @param  {String} fit
 * @return {String}
 */
export function contentfulImageUrl(
  url,
  width = null,
  height = null,
  fit = null,
) {
  if (!url) {
    return undefined;
  }

  const params = withoutNulls({
    w: width, // eslint-disable-line id-length
    h: height, // eslint-disable-line id-length
    fit,
  });

  return Object.keys(params).length ? appendToQuery(params, url).href : url;
}

/**
 * Generate srcset value at specified sizes for a Contentful Image URL.
 *
 * @param {String} url
 * @param {Object} sizes
 */
export function contentfulImageSrcset(url, sizes) {
  const sources = sizes.map(size => {
    return `${contentfulImageUrl(url, size.width, size.height, 'fill')} ${
      size.width
    }w`;
  });

  return sources.join(', ');
}

/**
 * Get the content type of the given entry, including custom
 * overrides for "Custom Block" or "Campaign Action Step" or
 * manual re-assignments.
 *
 * @param  {Object} json
 * @param  {String} default
 * @return {String}
 */
export function parseContentfulType(json, defaultType) {
  // Figure out the "type" of this entry based on 'customType' field, Contentful machine name,
  // or the 'type' set in the API transformer. If none of those match, use the given default.
  return (
    json.__typename ||
    get(json, 'fields.customType') ||
    get(json, 'type.sys.id') ||
    get(json, 'type') ||
    defaultType
  );
}

export default null;
