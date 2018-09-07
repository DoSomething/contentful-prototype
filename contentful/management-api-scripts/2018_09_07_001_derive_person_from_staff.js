const { contentManagementClient } = require('./contentManagementClient');
const {
  attempt,
  createLogger,
  getField,
  processEntries,
  sleep,
  withFields,
} = require('./helpers');

const logger = createLogger('derive_person_from_staff');

async function derivePersonFromStaff(environment, staff) {
  const staffInternalTitle = getField(staff, 'internalTitle');
  const staffName = getField(staff, 'name');
  const staffJobTitle = getField(staff, 'jobTitle');
  const staffAvatar = getField(staff, 'avatar');
  const staffEmail = getField(staff, 'email');

  logger.info(`Processing Staff! [ID: ${staff.sys.id}]\n`);

  const person = await attempt(() =>
    environment.createEntry(
      'person',
      withFields({
        name: staffName,
        jobTitle: staffJobTitle,
        photo: staffAvatar,
        email: staffEmail,
        // Persist Internal Title info, in case it contains anything of note.
        description: staffInternalTitle,
      }),
    ),
  );

  if (person) {
    console.log(`-   Created  Person! [ID: ${person.sys.id}]\n`);
  }

  logger.info(`Processed Staff! [ID: ${staff.sys.id}]\n`);
  logger.info('--------------------------------------------\n');

  // API breather room
  sleep(1000);
}

contentManagementClient.init((environment, args) =>
  processEntries(environment, args, 'staff', derivePersonFromStaff),
);
