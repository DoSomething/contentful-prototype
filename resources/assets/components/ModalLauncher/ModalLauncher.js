/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import { get, set } from '../../helpers/storage';
import { isTimestampValid } from '../../helpers';

class ModalLauncher extends React.Component {
  constructor(props) {
    super(props);

    this.shouldSeeModal = this.shouldSeeModal.bind(this);

    // If the query params indicate to store the feature modal to be hidden
    // (including a legacy format for NPS Typeform Survey), store it.
    if (window.location.search === '?finished_nps=1') {
      set(`${props.userId}_finished_survey`, 'boolean', true);
    } else if (window.location.search === `?hide_${props.type}=1`) {
      set(`${props.userId}_hide_${props.type}`, 'boolean', true);
    }
  }

  componentDidMount() {
    if (this.props.userId && this.shouldSeeModal()) {
      const openModal = this.props.openModal.bind(this, this.props.modalType);
      this.timer = setTimeout(openModal, this.props.countdown * 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  shouldSeeModal() {
    const { userId, type, isAuthenticated } = this.props;

    if (! isAuthenticated) {
      return false;
    }

    const env = window.ENV || {};

    let shouldNotSee = get(`${userId}_hide_${type}`, 'boolean');
    // Support for legacy nps survey 'hide feature' storage format.
    if (type === 'nps_survey' && ! shouldNotSee) {
      shouldNotSee = get(`${userId}_finished_survey`, 'boolean');
    }


    // @see: SurveyModal.js
    const dismissalTime = get(`${userId}_dismissed_${type}`, 'timestamp');
    // Check if the survey was dismissed over 30 days ago.
    const isDismissed = isTimestampValid(dismissalTime, (30 * 1440 * 60 * 1000));

    return env[`${type.toUpperCase()}_ENABLED`] && ! shouldNotSee && ! isDismissed;
  }

  render() {
    return null;
  }
}

ModalLauncher.propTypes = {
  userId: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  type: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  countdown: PropTypes.number.isRequired,
};

ModalLauncher.defaultProps = {
  userId: null,
  isAuthenticated: false,
};


export default ModalLauncher;
