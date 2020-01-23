const { contentManagementClient } = require('./contentManagementClient');
const { attempt, createLogger, getField, constants } = require('./helpers');

const { LOCALE } = constants;

const logger = createLogger('import_landing_page_additional_content');

async function importLandingPageAdditionalContent(environment, id) {
  logger.info(`Fetching Landing Page ${id}`);

  const entry = await attempt(() => environment.getEntry(id));

  logger.info(
    `Retrieved Landing Page ${id} ${getField(entry, 'internalTitle')}`,
  );

  // Initalize an object to write save to the Additonal Content field.
  const newAdditionalContentValue = {};

  // Save the content field value as a legacyTemplateContent property.
  newAdditionalContentValue[LOCALE] = {
    legacyTemplateContent: getField(entry, 'content'),
  };
  entry.fields.additionalContent = newAdditionalContentValue;

  // Attempt to update the entry.
  const updatedEntry = await attempt(() => entry.update());

  if (!updatedEntry) {
    logger.info(`-- Could not update entry ${id}`);

    return;
  }

  logger.info(`-- Updated entry ${id}`);

  // Attempt to publish the entry.
  const publishedEntry = await attempt(() => updatedEntry.publish());

  logger.info(`-- Published entry ${id}`);
}

contentManagementClient.init(async (environment, args) => {
  const id = args['id'];

  if (id) {
    return importLandingPageAdditionalContent(environment, args['id']);
  }

  if (!args['all']) {
    return console.log('Missing --all or --id parameters.');
  }

  const result = await attempt(() =>
    environment.getEntries({
      content_type: 'campaign',
      'fields.additionalContent[exists]': true,
    }),
  );

  // If campaign uses the legacy template, save its Landing Page content field to additionalContent.
  result.items.forEach(async campaignEntry => {
    const additionalContent = getField(campaignEntry, 'additionalContent');

    if (additionalContent.featureFlagUseLegacyTemplate !== true) {
      return;
    }

    logger.info(`Updating legacy template Campaign ${campaignEntry.sys.id}`);

    const landingPageEntry = getField(campaignEntry, 'landingPage');

    if (!landingPageEntry) {
      return;
    }

    return await importLandingPageAdditionalContent(
      environment,
      landingPageEntry.sys.id,
    );
  });
});
