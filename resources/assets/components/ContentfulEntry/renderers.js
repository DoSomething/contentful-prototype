import React from 'react';
import { PuckWaypoint } from '@dosomething/puck-client';

import Affirmation from '../Affirmation';
import { withoutNulls } from '../../helpers';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import ShareActionContainer from '../actions/ShareAction/ShareActionContainer';
import ReferralSubmissionActionContainer from '../actions/ReferralSubmissionAction/ReferralSubmissionActionContainer';

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
