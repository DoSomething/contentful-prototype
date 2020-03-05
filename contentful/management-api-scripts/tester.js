const fetch = require('node-fetch');
const { format, getTime, isBefore, isWithinInterval } = require('date-fns');

const {
  getField,
  processEntries,
  attempt,
  withFields,
  linkReference,
  constants,
  sleep,
} = require('./helpers');

const { LOCALE } = constants;
const { contentManagementClient } = require('./contentManagementClient');
let count = 0;
// const linksToEntry = await environment.getEntries({
//   links_to_entry: customBlock.sys.id,
// });

function isCampaignClosed(endDate) {
  if (!endDate) {
    return false;
  }

  return isBefore(endDate, new Date());
}

contentManagementClient.init(async (environment, args) => {
  await processEntries(
    environment,
    args,
    'contentBlock',
    async (environment, contentBlock) => {
      const content = getField(contentBlock, 'content', '');

      const modalLinks =
        content &&
        content.match(
          /\[.+\]\(\/us\/campaigns\/.+\/modal\/[a-zA-Z0-9]+?(\s\".+\")\)/g,
        );

      if (!modalLinks) {
        return;
      }

      for (let i = 0; i < modalLinks.length; i++) {
        const modalLink = modalLinks[i];
        const modalEntryId = modalLink
          .match(/\/modal\/[a-zA-Z0-9]+/)[0]
          .replace('/modal/', '');

        const modalEntry = await attempt(() =>
          environment.getEntry(modalEntryId),
        );

        if (!modalEntry) {
          continue;
        }

        const type = modalEntry.sys.contentType.sys.id;

        if (type !== 'page') {
          continue;
        }

        count++;
        console.log(count, '.');

        console.log(
          contentBlock.sys.id,
          getField(contentBlock, 'internalTitle'),
        );

        const derivedContentBlock = await environment.createEntry(
          'contentBlock',
          withFields({
            internalTitle: getField(modalEntry, 'internalTitle'),
            title: getField(modalEntry, 'title'),
            content: getField(modalEntry, 'content'),
          }),
        );

        await derivedContentBlock.publish();

        contentBlock.fields.content[LOCALE] = content.replace(
          modalEntryId,
          derivedContentBlock.sys.id,
        );

        const updatedContentBlock = await attempt(() => contentBlock.update());

        if (!updatedContentBlock) {
          continue;
        }

        await attempt(() => updatedContentBlock.publish());
      }

      await sleep(1000);
    },
  );
});
