import React from 'react';

import Affirmation from '../Affirmation';
import { withoutNulls } from '../../helpers';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import ReferralSubmissionActionContainer from '../actions/ReferralSubmissionAction/ReferralSubmissionActionContainer';

/**
 * Render a referral submission action.
 *
 * @param  {Object} data
 * @return {Component}
 */
export function renderReferralSubmissionAction(data) {
  const fields = withoutNulls(data.fields);

  return <ReferralSubmissionActionContainer id={data.id} {...fields} />;
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
