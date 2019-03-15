import React from 'react';
import { PuckWaypoint } from '@dosomething/puck-client';

import Affirmation from '../Affirmation';
import { withoutNulls } from '../../helpers';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import LinkActionContainer from '../actions/LinkAction/LinkActionContainer';
import ShareActionContainer from '../actions/ShareAction/ShareActionContainer';
import PhotoSubmissionActionContainer from '../actions/PhotoSubmissionAction/PhotoSubmissionActionContainer';
import SubmissionGalleryBlockContainer from '../blocks/SubmissionGalleryBlock/SubmissionGalleryBlockContainer';
import VoterRegistrationActionContainer from '../actions/VoterRegistrationAction/VoterRegistrationActionContainer';
import ReferralSubmissionActionContainer from '../actions/ReferralSubmissionAction/ReferralSubmissionActionContainer';

/**
 * Render the voter registration action container.
 *
 * @return {Component}
 */
export function renderVoterRegistrationAction(step) {
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
      <ShareActionContainer id={step.id} {...withoutNulls(step.fields)} />
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
 * Render a photo submission action.
 *
 * @param  {Object} data
 * @return {Component}
 */
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
      <div className="margin-vertical-md">
        <SubmissionGalleryBlockContainer type="photo" />
      </div>
      <PuckWaypoint
        name="photo_submission_action-bottom"
        waypointData={{ contentfulId }}
      />
    </div>
  );
}

/**
 * Render a referral submission action.
 *
 * @param  {Object} data
 * @return {Component}
 */
export function renderReferralSubmissionAction(data) {
  const fields = withoutNulls(data.fields);

  return (
    <div className="margin-horizontal-md margin-bottom-lg">
      <ReferralSubmissionActionContainer id={data.id} {...fields} />
    </div>
  );
}

/**
 * Render an affirmation.
 *
 * @param  {Object} data
 * @return {Component}
 */
export function renderAffirmation(data) {
  const fields = withoutNulls(data.fields);

  return <Affirmation {...fields} />;
}

/**
 * Render a content block.
 *
 * @param {Object} data ContentBlock
 * @return {Component}
 */
export function renderContentBlock(data, className = null) {
  const fields = withoutNulls(data.fields);

  return <ContentBlock className={className} id={data.id} {...fields} />;
}
