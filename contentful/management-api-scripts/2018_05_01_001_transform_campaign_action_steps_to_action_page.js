const { join } = require('path');
const { get } = require('lodash');
const { contentManagementClient } = require('./contentManagementClient');
const {
  attempt,
  constants,
  createLogger,
  getField,
  processEntries,
  linkReference,
  sleep,
  withFields,
  run,
} = require('./helpers');

const { LOCALE } = constants;

const logger = createLogger('action_page_transformation_from_action_steps');

async function addActionPageFromActionSteps(environment, campaign) {
  const campaignInternalTitle = getField(campaign, 'internalTitle');
  const campaignSlug = getField(campaign, 'slug');
  const campaignTitle = getField(campaign, 'title');
  const campaignActionSteps = getField(campaign, 'actionSteps');

  // No need to transform action steps if they don't exist.
  if (!campaignActionSteps) {
    logger.info(`Skipping Campaign! [ID: ${campaign.sys.id}]\n`);
    logger.info('--------------------------------------------\n');
    return;
  }

  logger.info(`Processing Campaign! [ID: ${campaign.sys.id}]\n`);

  // Keep count of the index of action steps so that we can manually add the correct Step Numbers (normally generated in PN when rendering action steps)
  let stepIndex = 1;

  // This will hold the new set of blocks we'll be adding to the created Action Page.
  const actionPageBlocks = [];

  for (var i = 0; i < campaignActionSteps.length; i++) {
    const campaignActionStep = await attempt(() =>
      environment.getEntry(campaignActionSteps[i].sys.id),
    );

    if (!campaignActionStep) {
      continue;
    }

    const contentType = get(campaignActionStep.sys, 'contentType.sys.id');

    // If the action step block is a Campaign Action Step, we'll replace it with a Content Block (and ImagesBlock if necessary)
    if (contentType === 'campaignActionStep') {
      const actionStepTitle = getField(campaignActionStep, 'title');
      const content = getField(campaignActionStep, 'content');
      const hideStepNumber = getField(campaignActionStep, 'hideStepNumber');
      const photos = getField(campaignActionStep, 'photos', []);
      const additionalContent = getField(
        campaignActionStep,
        'additionalContent',
        {},
      );

      // Campaign Action Steps supported an optional preTitle field in additionalContent
      // which was set as the SectionHeader superTitle
      let superTitle = additionalContent['preTitle'];

      // If the action step is meant to have a step number attached, we'll manually add it as the superTitle
      if (hideStepNumber == null || !hideStepNumber) {
        superTitle = `Step ${stepIndex}`;
      }

      if (!content) {
        logger.info(
          `  - Skipping Campaign Action Step! [ID: ${campaign.sys.id}]\n`,
        );
      }

      logger.info(
        `  - Processing Campaign Action Step! [ID: ${
          campaignActionStep.sys.id
        }]\n`,
      );

      const internalTitle = `${campaignInternalTitle} - Action Step ${stepIndex}`;

      const contentBlockFields = {
        internalTitle,
        superTitle,
        title: actionStepTitle,
        content,
      };

      // If there is only one photo on this action step, set it to the new content blocks 'image' field
      if (photos.length === 1) {
        contentBlockFields['image'] = photos[0];
      }

      const contentBlock = await attempt(() =>
        environment.createEntry('contentBlock', withFields(contentBlockFields)),
      );

      const publishedContentBlock = await attempt(() => contentBlock.publish());

      if (publishedContentBlock) {
        let publishedImagesBlock;

        // If the action step has multiple photos, we'll add them to a separate Images Block
        if (photos.length) {
          const imagesBlock = await attempt(() =>
            environment.createEntry(
              'imagesBlock',
              withFields({
                internalTitle: `${internalTitle} - photos`,
                images: photos,
              }),
            ),
          );
          publishedImagesBlock = await attempt(() => imagesBlock.publish());
        }

        actionPageBlocks.push(linkReference(publishedContentBlock.sys.id));
        stepIndex++;
        logger.info(
          `    * Created Content Block! [ID: ${
            publishedContentBlock.sys.id
          }]\n`,
        );

        if (publishedImagesBlock) {
          actionPageBlocks.push(linkReference(publishedImagesBlock.sys.id));
          logger.info(
            `    * Created Images Block! [ID: ${
              publishedImagesBlock.sys.id
            }]\n`,
          );
        }
      }
    } else {
      // If this block is not a Campaign Action Step we can just simply add it to the new Action Page
      actionPageBlocks.push(campaignActionSteps[i]);
    }
  }

  const actionPage = await attempt(() =>
    environment.createEntry(
      'page',
      withFields({
        internalTitle: `${campaignInternalTitle} Action Page`,
        title: 'Action',
        slug: join(campaignSlug, 'action'),
        blocks: actionPageBlocks,
      }),
    ),
  );

  if (actionPage) {
    const publishedActionPage = attempt(() => actionPage.publish());
    if (publishedActionPage) {
      console.log(`  - Created Action Page! [ID: ${actionPage.sys.id}]\n`);

      if (!campaign.fields.pages) {
        // Ensure the campaign has a pages property with the correct locale
        campaign.fields.pages = { [LOCALE]: [] };
      }
      // Add a Link to the new Page in the campaigns Pages field
      campaign.fields.pages[LOCALE].unshift(linkReference(actionPage.sys.id));

      // Remove actionSteps blocks from campaign
      campaign.fields.actionSteps[LOCALE] = [];

      // Update and publish the campaign
      const updatedCampaign = await attempt(() => campaign.update());
      if (updatedCampaign) {
        const publishedCampaign = await attempt(() =>
          updatedCampaign.publish(),
        );
        if (publishedCampaign) {
          logger.info(
            `  - Successfully published Campaign! [ID: ${campaign.sys.id}]\n`,
          );
        }
      }
    }
  }

  logger.info(`Processed Campaign! [ID: ${campaign.sys.id}]\n`);
  logger.info('--------------------------------------------\n');

  // API breather room
  sleep(1000);
}

contentManagementClient.init((environment, args) =>
  processEntries(environment, args, 'campaign', addActionPageFromActionSteps),
);
