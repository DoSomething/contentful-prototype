/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import { SURVEY_MODAL } from '../Modal';

import { get, set } from '../../helpers/storage';
import { isTimestampValid } from '../../helpers';

// TODO - SURVEY_COUNTDOWN should be set to 60. Set to 5 for testing and sanity.
const SURVEY_COUNTDOWN = 60;

class Survey extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0,
    };

    this.incrementOrLaunch = this.incrementOrLaunch.bind(this);
    this.shouldSeeSurvey = this.shouldSeeSurvey.bind(this);
  }

  componentDidMount() {
    // If the query params indicate a redirect from typeform post survey submission, track
    if (window.location.search === '?finished_nps=1') {
      set(`${this.props.userId}_finished_survey`, 'boolean', true);
    }

    if (this.shouldSeeSurvey()) {
      this.timer = setInterval(this.incrementOrLaunch, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  shouldSeeSurvey() {
    const userId = this.props.userId;

    const isFinished = get(`${userId}_finished_survey`, 'boolean');

    // @see: SurveyModal.js
    const dismissalTime = get(`${userId}_dismissed_survey`, 'timestamp');
    // Check if the survey was dismissed over 30 days ago.
    const isDismissed = isTimestampValid(dismissalTime, (30 * 1440 * 60 * 1000));

    return userId && ! isFinished && ! isDismissed;
  }

  incrementOrLaunch() {
    if (this.state.count < SURVEY_COUNTDOWN) {
      this.setState(prevState => ({ count: prevState.count + 1 }));
    } else {
      this.props.openModal(SURVEY_MODAL);
      clearInterval(this.timer);
    }
  }

  render() {
    return null;
  }
}

Survey.propTypes = {
  userId: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

Survey.defaultProps = {
  userId: null,
};

export default Survey;
