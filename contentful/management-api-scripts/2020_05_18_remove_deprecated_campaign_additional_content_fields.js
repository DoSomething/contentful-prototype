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

const logger = createLogger(
  'remove_deprecated_campaign_additional_content_fields',
);

const deprecatedAdditionalContentFields = [
  'campaignLead',
  'sixpackSourceActionText',
  'themeColor',
  'enableBackgroundTest',
  'featureFlags',
  'NumberOfScholarships',
  'reverseActivityFeedOrder',
  'displayAffilitateOptOut',
  'reportbackAffirmation',
  'affiliateOption',
  'verb',
  'noun',
  'tagline',
  'smsShareConfirmationActionText',
  'smsShareConfirmationActionLink',
  'smsShareConfirmation',
  'referralRB',
  'sourceActionText',
];

const removeDeprecatedAdditionalContentFields = async (
  environment,
  campaignEntry,
) => {
  const campaignInternalTitle = getField(campaignEntry, 'internalTitle');
  const campaignAdditionalContent = getField(
    campaignEntry,
    'additionalContent',
  );

  if (!campaignAdditionalContent) {
    return;
  }

  const containsDeprecatedField = Object.keys(campaignAdditionalContent).some(
    key => deprecatedAdditionalContentFields.includes(key),
  );

  if (!containsDeprecatedField) {
    return;
  }

  logger.info(`\n\nProcessing ${campaignInternalTitle}.`);

  const isArchived = await campaignEntry.isArchived();

  if (isArchived) {
    logger.info(`→ Skipping archived campaign ${campaignInternalTitle}.`);
    return;
  }

  const withoutDeprecatedFields = omit(
    campaignAdditionalContent,
    deprecatedAdditionalContentFields,
  );

  campaignEntry.fields.additionalContent[LOCALE] = Object.keys(
    withoutDeprecatedFields,
  ).length
    ? withoutDeprecatedFields
    : null;

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

  await sleep(200);
};

contentManagementClient.init(async (environment, args) => {
  logger.info(
    `Running 'remove_deprecated_campaign_additional_content_fields', using Contentful's '${environment.sys.id}' environment.`,
  );
  logger.info('Kicking things off in 5 seconds...');

  await sleep(5000);

  await processEntries(
    environment,
    args,
    'campaign',
    removeDeprecatedAdditionalContentFields,
  );
});
