/**
 * Check if the given page is using legacy slug format.
 *
 * @param  {Object}  page
 * @return {Boolean}
 */
export function hasSlugFix(page) { // eslint-disable-line import/prefer-default-export
  return page.fields.additionalContent && page.fields.additionalContent.slugFix;
}
