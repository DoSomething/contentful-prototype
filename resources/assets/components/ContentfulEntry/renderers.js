import React from 'react';
import { PuckWaypoint } from '@dosomething/puck-client';

import Affirmation from '../Affirmation';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import { withoutNulls } from '../../helpers';
import LinkActionContainer from '../actions/LinkAction/LinkActionContainer';
import ShareActionContainer from '../actions/ShareAction/ShareActionContainer';
import ThirdPartyActionContainer from '../actions/ThirdPartyAction/ThirdPartyActionContainer';
import TextSubmissionActionContainer from '../actions/TextSubmissionAction/TextSubmissionActionContainer';
import PhotoSubmissionActionContainer from '../actions/PhotoSubmissionAction/PhotoSubmissionActionContainer';
import SubmissionGalleryBlockContainer from '../blocks/SubmissionGalleryBlock/SubmissionGalleryBlockContainer';
import VoterRegistrationActionContainer from '../actions/VoterRegistrationAction/VoterRegistrationActionContainer';
import ReferralSubmissionActionContainer from '../actions/ReferralSubmissionAction/ReferralSubmissionActionContainer';

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
      <LinkActionContainer {...withoutNulls(step.fields)} />
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
      <TextSubmissionActionContainer id={contentfulId} {...data.fields} />
      <SubmissionGalleryBlockContainer type="text" />
      <PuckWaypoint
        name="text_submission_action-bottom"
        waypointData={{ contentfulId }}
      />
    </div>
  );
}

export function renderPhotoSubmissionAction(data) {
  const contentfulId = data.id;
  const fields = withoutNulls(data.fields);

  return (
    <div className="margin-horizontal-md margin-bottom-lg">
      <PuckWaypoint
        name="photo_submission_action-top"
        waypointData={{ contentfulId }}
      />
      <PhotoSubmissionActionContainer id={contentfulId} {...fields} />
      <SubmissionGalleryBlockContainer type="photo" />
      <PuckWaypoint
        name="photo_submission_action-bottom"
        waypointData={{ contentfulId }}
      />
    </div>
  );
}

export function renderReferralSubmissionAction(data) {
  const fields = withoutNulls(data.fields);

  return (
    <div className="margin-horizontal-md margin-bottom-lg">
      <ReferralSubmissionActionContainer id={data.id} {...fields} />
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
  const fields = withoutNulls(data.fields);

  return (
    <ContentBlock key={`content-block-${data.id}`} id={data.id} {...fields} />
  );
}
