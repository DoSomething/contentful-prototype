const { get } = require('lodash');
const { contentManagementClient } = require('./contentManagementClient');
const {
  attempt,
  createLogger,
  getField,
  processEntries,
  sleep,
  withFields,
  linkReference,
  constants,
} = require('./helpers');

const { LOCALE } = constants;

const logger = createLogger('replace_staff_linked_entries_with_person');

async function replaceStaffLinkedEntriesWithPerson(environment, staff) {
  const staffName = getField(staff, 'name');

  logger.info(`Processing Staff! [ID: ${staff.sys.id}] [Name: ${staffName}]\n`);

  // Find the Person entries of the same name.
  const people = await environment.getEntries({
    content_type: 'person',
    'fields.name[match]': staffName,
  });

  // Hard return if there is no Person equivalent.
  if (!people.items.length) {
    return;
  }

  // Our Staff names are unique, so there shouldn't be more then one match.
  const person = people.items[0];

  // Generate Link Reference to the Person.
  const personLink = linkReference(person.sys.id);

  // Find all Entries which link to the Staff entry.
  const linkedEntries = await environment.getEntries({
    links_to_entry: staff.sys.id,
  });

  logger.info(
    `Processing links to ${staffName}. There are ${
      linkedEntries.items.length
    } links.`,
  );

  for (let i = 0; i < linkedEntries.items.length; i++) {
    const linkedEntry = linkedEntries.items[i];

    logger.info(
      `Processing Link ${i + 1} OF ${linkedEntries.items.length} [ID: ${
        linkedEntry.sys.id
      }]\n`,
    );

    const linkedEntryType = get(linkedEntry, 'sys.contentType.sys.id');

    // Default 'Staff' field should be 'author'. Special cases are Campaigns and Affirmations.
    let authorField = 'author';
    switch (linkedEntryType) {
      case 'campaign':
        authorField = 'campaignLead';
        break;
      case 'affirmation':
        authorField = 'newAuthor';
        break;
    }

    // If the linked entry is archived, we can't update it.
    const isLinkedEntryArchived = await linkedEntry.isArchived();
    if (isLinkedEntryArchived) {
      logger.info(`-- Skipping Archived Link! [ID: ${linkedEntry.sys.id}]\n`);
      continue;
    }

    // Determine if the linked entry was already published to prevent publishing a draft entry.
    const wasLinkedEntryPublished = await linkedEntry.isPublished();

    // Replace the link to Staff entry with a link to the Person.
    linkedEntry.fields[authorField][LOCALE] = personLink;

    // Attempt to update the entry.
    const updatedLinkedEntry = await attempt(() => linkedEntry.update());

    if (updatedLinkedEntry) {
      logger.info(`-- Updated Link! [ID: ${linkedEntry.sys.id}]\n`);
    }

    if (updatedLinkedEntry && wasLinkedEntryPublished) {
      // Attempt to publish the entry.
      const publishedLinkedEntry = await attempt(() =>
        updatedLinkedEntry.publish(),
      );

      if (publishedLinkedEntry) {
        logger.info(`-- Published Link! [ID: ${linkedEntry.sys.id}]\n`);
      }
    }
  }

  // Determine if there's a mismatch in linked entries for the original Staff and the person.
  // If there is, we'll log it so we can manually debug.
  const personLinkedEntries = await environment.getEntries({
    links_to_entry: person.sys.id,
  });
  if (personLinkedEntries.items.length !== linkedEntries.items.length) {
    logger.error(
      `There are less entries linking to the Person then to the Staff!! [Person ID: ${
        person.sys.id
      }] [Staff ID: ${staff.sys.id}]`,
    );
  }

  logger.info(`Processed Staff! [ID: ${staff.sys.id}] [Name: ${staffName}]\n`);
  logger.info('--------------------------------------------\n');
}

contentManagementClient.init((environment, args) =>
  processEntries(
    environment,
    args,
    'staff',
    replaceStaffLinkedEntriesWithPerson,
  ),
);
