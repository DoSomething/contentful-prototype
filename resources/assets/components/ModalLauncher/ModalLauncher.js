import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Modal from '../utilities/Modal/Modal';
import { get as getStorage, set as setStorage } from '../../helpers/storage';
import { isTimestampValid, env, query } from '../../helpers';

class ModalLauncher extends React.Component {
  state = { showModal: false };

  componentDidMount() {
    const { type, userId, countdown } = this.props;

    // If the query params indicate to store the feature modal to be hidden, store it.
    if (query(`hide_${type}`) === '1') {
      setStorage(`${userId}_hide_${type}`, 'boolean', true);
    }

    if (userId && this.shouldSeeModal()) {
      this.timer = setTimeout(() => {
        this.setState({ showModal: true });
      }, countdown * 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  shouldSeeModal = () => {
    const { userId, type, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return false;
    }

    let shouldNotSee = getStorage(`${userId}_hide_${type}`, 'boolean');
    // Support for legacy nps survey 'hide feature' storage format.
    if (type === 'nps_survey' && !shouldNotSee) {
      shouldNotSee = getStorage(`${userId}_finished_survey`, 'boolean');
    }

    // Check if the survey was dismissed over 30 days ago.
    const dismissalTime = getStorage(
      `${userId}_dismissed_${type}`,
      'timestamp',
    );
    const isDismissed = isTimestampValid(dismissalTime, 30 * 1440 * 60 * 1000);

    return (
      env(`${type.toUpperCase()}_ENABLED`) && !shouldNotSee && !isDismissed
    );
  };

  handleClose = () => {
    const { userId, type } = this.props;

    // Mark this modal as "dismissed" in local storage & close.
    setStorage(`${userId}_dismissed_${type}`, 'timestamp', Date.now());
    this.setState({ showModal: false });
  };

  render() {
    const { type } = this.props;

    // Map the modal type to the proper Puck "event" so
    // we can continue tracking opens of timed modals.
    const trackingOverrides = {
      voter_reg_modal: 'VOTER_REGISTRATION_MODAL',
      nps_survey: 'SURVEY_MODAL',
    };

    return this.state.showModal ? (
      <Modal
        trackingId={get(trackingOverrides, type, type)}
        onClose={this.handleClose}
      >
        {this.props.render()}
      </Modal>
    ) : null;
  }
}

ModalLauncher.propTypes = {
  userId: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  type: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
};

ModalLauncher.defaultProps = {
  userId: null,
  isAuthenticated: false,
};

export default ModalLauncher;
