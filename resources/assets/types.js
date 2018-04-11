// A JSON "block" content type, from Contentful.
export type ContentfulEntryJson = {
  id: string,
  type: string,
  fields: any,

  // When displayed in the feed, we distribute reportbacks
  // to the available blocks by adding IDs to this property.
  reportbacks: ?Array<string>,
};
