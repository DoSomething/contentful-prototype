const { omit } = require('lodash');

const { contentManagementClient } = require('./contentManagementClient');
const {
  constants,
  createLogger,
  getField,
  processEntries,
  sleep,
  withFields,
} = require('./helpers');

const { LOCALE } = constants;

const logger = createLogger('remove_signup_arrow_content_field_from_campaigns');

const removeSignupArrowContentField = async (environment, campaignEntry) => {
  const campaignInternalTitle = getField(campaignEntry, 'internalTitle');
  const campaignAdditionalContent = getField(
    campaignEntry,
    'additionalContent',
  );

  if (
    !campaignAdditionalContent ||
    !campaignAdditionalContent.signupArrowContent
  ) {
    return;
  }

  logger.info(`\n\nProcessing ${campaignInternalTitle}.`);

  const isArchived = await campaignEntry.isArchived();

  if (isArchived) {
    logger.info(`→ Skipping archived campaign ${campaignInternalTitle}.`);
    return;
  }

  campaignEntry.fields.additionalContent[LOCALE] = omit(
    campaignAdditionalContent,
    'signupArrowContent',
  );

  const updatedCampaign = await campaignEntry.update();

  if (!updatedCampaign) {
    logger.info(`☓ Unable to update ${campaignInternalTitle}.`);
    return;
  }

  // Make sure that we don't publish an unpublished campaign by mistake:
  const wasPublished = await campaignEntry.isPublished();

  if (!wasPublished) {
    logger.warn(`→ Needs review: ${campaignEntry.sys.id}`);
    return;
  }

  publishedUpdatedCampaign = await updatedCampaign.publish();

  if (!publishedUpdatedCampaign) {
    logger.info(`☓ Unable to publish updated ${campaignInternalTitle}.`);
    return;
  }

  logger.info(`✔ Published updated ${campaignInternalTitle}.`);

  await sleep(500);
};

contentManagementClient.init(async (environment, args) => {
  logger.info(
    `Running 'remove_signup_arrow_content_field_from_campaigns', using Contentful's '${environment.sys.id}' environment.`,
  );
  logger.info('Kicking things off in 5 seconds...');

  await sleep(5000);

  await processEntries(
    environment,
    args,
    'campaign',
    removeSignupArrowContentField,
  );
});
