import React from 'react';
import { PuckWaypoint } from '@dosomething/puck-client';

import Affirmation from '../Affirmation';
import { LegacyContentBlock } from '../Block';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import { CompetitionBlockContainer } from '../CompetitionBlock';
import { ReportbackUploaderContainer } from '../ReportbackUploader';
import { SubmissionGalleryContainer } from '../Gallery/SubmissionGallery';
import LinkActionContainer from '../actions/LinkAction/LinkActionContainer';
import ShareActionContainer from '../actions/ShareAction/ShareActionContainer';
import ThirdPartyActionContainer from '../actions/ThirdPartyAction/ThirdPartyActionContainer';
import TextSubmissionActionContainer from '../actions/TextSubmissionAction/TextSubmissionActionContainer';
import SubmissionGalleryBlockContainer from '../blocks/SubmissionGalleryBlock/SubmissionGalleryBlockContainer';
import VoterRegistrationActionContainer from '../actions/VoterRegistrationAction/VoterRegistrationActionContainer';

/**
 * Render a competition step.
 *
 * @param  {Object} step Component Action Step
 * @return {Component}
 */
export function renderCompetitionStep(step) {
  const { id, fields } = step;
  const { content, photos, additionalContent } = fields;

  return (
    <CompetitionBlockContainer
      key={id}
      content={content}
      photo={photos[0]}
      byline={additionalContent}
    />
  );
}

/**
 * Render the Photo Uploader step.
 *
 * @param  {Object}  step       Photo Uploader Action
 * @param  {Boolean} isSignedUp
 * @return {Component}
 */
export function renderPhotoUploader(step, isSignedUp) {
  if (!isSignedUp) {
    return null;
  }

  return (
    <div key="reportback_uploader" className="margin-bottom-lg">
      <PuckWaypoint name="photo_uploader_action-top" />
      <div className="margin-horizontal-md">
        <ReportbackUploaderContainer actionType={step.type} {...step.fields} />
      </div>
      <PuckWaypoint name="photo_uploader_action-bottom" />
    </div>
  );
}

/**
 * Render the user Submissions Gallery.
 *
 * @param  {Boolean} isSignedUp
 * @return {Component}
 */
export function renderSubmissionGallery(isSignedUp) {
  if (!isSignedUp) {
    return null;
  }

  return <SubmissionGalleryContainer key="submission_gallery" />;
}

/**
 * Render a Third Party Action step.
 *
 * @param  {Object} step      CustomBlock action
 * @param  {Integer} stepIndex Index of the given step
 * @return {Component}
 */
export function renderThirdPartyAction(step, stepIndex) {
  const { id, fields } = step;
  const { title, content, hideStepNumber, additionalContent } = fields;

  return (
    <ThirdPartyActionContainer
      key={id}
      title={title}
      content={content}
      stepIndex={stepIndex}
      dynamicLink={additionalContent.dynamicLink || null}
      hideStepNumber={hideStepNumber}
      dynamicUrlParams={additionalContent.dynamicUrlParams || null}
    />
  );
}

/**
 * Render a Campaign Action Step.
 *
 * @param  {Object} step      Campaign Action Step.
 * @param  {Integer} stepIndex Index of the current step.
 * @param  {String} template The current campaign template.
 * @return {Component}
 */
export function renderLegacyContentBlock(step, stepIndex, template) {
  const { id, fields } = step;
  const {
    title,
    content,
    background,
    photos,
    displayOptions,
    hideStepNumber,
    truncate,
    additionalContent,
  } = fields;

  const preTitle = additionalContent && additionalContent.preTitle;

  return (
    <LegacyContentBlock
      key={id}
      preTitle={preTitle}
      title={title}
      content={content}
      stepIndex={stepIndex}
      background={background}
      photos={photos}
      photoWidth={displayOptions === 'full' ? 'full' : 'one-third'}
      hideStepNumber={hideStepNumber}
      shouldTruncate={truncate}
      template={template}
    />
  );
}

/**
 * Render the voter registration action container.
 *
 * @return {Component}
 */
export function renderVoterRegistrationAction(step, stepIndex) {
  const { title, content, link } = step.fields;
  const key = `voter-registration-action-${step.id}`;

  return (
    <div key={key} className="margin-bottom-lg margin-horizontal-md">
      <PuckWaypoint name="voter_registration_action-top" />
      <VoterRegistrationActionContainer
        contentfulId={step.id}
        content={content}
        title={title}
        link={link}
        stepIndex={stepIndex}
      />
      <PuckWaypoint name="voter_registration_action-bottom" />
    </div>
  );
}

/**
 * Render a share action.
 *
 * @return {Component}
 */
export function renderShareAction(step) {
  const contentfulId = step.id;

  return (
    <div key={`share-action-${contentfulId}`} className="margin-horizontal-md">
      <PuckWaypoint name="share_action-top" waypointData={{ contentfulId }} />
      <ShareActionContainer id={step.id} {...step.fields} />
      <PuckWaypoint
        name="share_action-bottom"
        waypointData={{ contentfulId }}
      />
    </div>
  );
}

/**
 * Render a link action.
 *
 * @return {Component}
 */
export function renderLinkAction(step) {
  const contentfulId = step.id;

  return (
    <div key={`link-action-${contentfulId}`} className="margin-horizontal-md">
      <PuckWaypoint name="link_action-top" waypointData={{ contentfulId }} />
      <LinkActionContainer {...step.fields} />
      <PuckWaypoint name="link_action-bottom" waypointData={{ contentfulId }} />
    </div>
  );
}

/**
 * Render a text submission action.
 *
 * @param {Object} data
 * @return {Component}
 */
export function renderTextSubmissionAction(data) {
  const contentfulId = data.id;

  return (
    <div
      key={`text-submission-action-${contentfulId}`}
      className="margin-horizontal-md margin-bottom-lg"
    >
      <PuckWaypoint
        name="text_submission_action-top"
        waypointData={{ contentfulId }}
      />
      <TextSubmissionActionContainer id={data.id} {...data.fields} />
      <SubmissionGalleryBlockContainer type="text" />
      <PuckWaypoint
        name="text_submission_action-bottom"
        waypointData={{ contentfulId }}
      />
    </div>
  );
}

/**
 * Render the affirmation step.
 *
 * @return {Component}
 */
export function renderAffirmation(step) {
  return <Affirmation content={step.fields} />;
}

/**
 * Render a content block.
 *
 * @param {Object} data ContentBlock
 * @return {Component}
 */
export function renderContentBlock(data) {
  const contentfulId = data.id;

  return (
    <div
      key={`content-block-${contentfulId}`}
      className="margin-horizontal-md margin-bottom-lg"
    >
      <ContentBlock id={contentfulId} {...data.fields} />
    </div>
  );
}
