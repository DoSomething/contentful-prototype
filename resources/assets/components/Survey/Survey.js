/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import { SURVEY_MODAL } from '../Modal';

import { get, set } from '../../helpers/storage';
import { isTimestampValid } from '../../helpers';

import ModalLauncherContainer from '../ModalLauncher';

const SURVEY_COUNTDOWN = 60;

const Survey = ({ userId }) => {
  // If the query params indicate a redirect from typeform post survey submission, track
  if (window.location.search === '?finished_nps=1') {
    set(`${userId}_finished_survey`, 'boolean', true);
  }

  const env = window.ENV || {};

  const isFinished = get(`${userId}_finished_survey`, 'boolean');

  // @see: SurveyModal.js
  const dismissalTime = get(`${userId}_dismissed_survey`, 'timestamp');
  // Check if the survey was dismissed over 30 days ago.
  const isDismissed = isTimestampValid(dismissalTime, (30 * 1440 * 60 * 1000));

  const shouldSeeSurvey = env.SURVEY_ENABLED && userId && ! isFinished && ! isDismissed;

  return shouldSeeSurvey ? (
    <ModalLauncherContainer
      countdown={SURVEY_COUNTDOWN}
      modalType={SURVEY_MODAL}
    />
  ) : null;
};

Survey.propTypes = {
  userId: PropTypes.string,
};

Survey.defaultProps = {
  userId: null,
};

export default Survey;
