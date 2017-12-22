import React from 'react';
import ActionStep from './ActionStep';
import Revealer from '../Revealer';
import SignupButtonFactory from '../SignupButton';
import VoterRegistrationContainer from '../VoterRegistration';
import { FlexCell } from '../Flex';
import { PostGalleryContainer } from '../Gallery/PostGallery';
import { ThirdPartyActionContainer } from '../Actions/ThirdPartyAction';
import { ReportbackUploaderContainer } from '../ReportbackUploader';
import { CompetitionBlockContainer } from '../CompetitionBlock';
import { SubmissionGalleryContainer } from '../Gallery/SubmissionGallery';

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
  if (! isSignedUp) {
    return null;
  }

  return (
    <FlexCell key="reportback_uploader" className="margin-bottom-lg" width="full">
      <div className="margin-horizontal-md">
        <ReportbackUploaderContainer {...step.fields} />
      </div>
    </FlexCell>
  );
}

/**
 * Render the user Submissions Gallery.
 *
 * @param  {Boolean} isSignedUp
 * @return {Component}
 */
export function renderSubmissionGallery(isSignedUp) {
  if (! isSignedUp) {
    return null;
  }

  return (
    <FlexCell key="submission_gallery" width="full">
      <SubmissionGalleryContainer />
    </FlexCell>
  );
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
      template="legacy"
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
export function renderActionStep(step, stepIndex, template) {
  const { id, fields } = step;
  const {
    title, content, background, photos,
    displayOptions, hideStepNumber, truncate,
  } = fields;

  return (
    <ActionStep
      key={id}
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
 * Render the action page revealer.
 *
 * @param  {String}  callToAction
 * @param  {Boolean} hasPendingSignup
 * @param  {Boolean} isSignedUp
 * @param  {String}  campaignId
 * @return {Component}
 */
export function renderRevealer(callToAction, hasPendingSignup, isSignedUp, campaignId) {
  const SignupRevealer = SignupButtonFactory(({ clickedSignUp }) => (
    <Revealer
      title="Join Us"
      callToAction={callToAction}
      isLoading={hasPendingSignup}
      onReveal={() => clickedSignUp(campaignId)}
      isSignedUp={isSignedUp}
    />
  ), 'action page revealer', { text: 'Join Us', callToAction });

  return (
    <SignupRevealer key="revealer" />
  );
}

/**
 * Render a legacy version of the user submissions gallery.
 *
 * @return {Component}
 */
export function renderLegacyGallery() {
  return (
    <div key="member_gallery" className="action-step">
      <div className="margin-top-xlg margin-bottom-xlg margin-horizontal-md">
        <h2 className="heading -emphasized legacy-step-header margin-top-md margin-bottom-md">
          <span>Member Gallery</span>
        </h2>
        <PostGalleryContainer key="post_gallery" type="reportback" />
      </div>
    </div>
  );
}

/**
 * Render the voter registration container.
 *
 * @return {Component}
 */
export function renderVoterRegistration() {
  return (
    <VoterRegistrationContainer key="voter-reg" />
  );
}
