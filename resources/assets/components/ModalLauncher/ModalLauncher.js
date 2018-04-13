import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../utilities/Modal/Modal';
import { get, set } from '../../helpers/storage';
import { isTimestampValid, env, query } from '../../helpers';

class ModalLauncher extends React.Component {
  state = { showModal: false };

  componentDidMount() {
    const { type, userId, countdown } = this.props;

    // If the query params indicate to store the feature modal to be hidden, store it.
    if (query(`hide_${type}`) === '1') {
      set(`${userId}_hide_${type}`, 'boolean', true);
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

    let shouldNotSee = get(`${userId}_hide_${type}`, 'boolean');
    // Support for legacy nps survey 'hide feature' storage format.
    if (type === 'nps_survey' && !shouldNotSee) {
      shouldNotSee = get(`${userId}_finished_survey`, 'boolean');
    }

    // @see: SurveyModal.js
    const dismissalTime = get(`${userId}_dismissed_${type}`, 'timestamp');
    // Check if the survey was dismissed over 30 days ago.
    const isDismissed = isTimestampValid(dismissalTime, 30 * 1440 * 60 * 1000);

    return (
      env(`${type.toUpperCase()}_ENABLED`) && !shouldNotSee && !isDismissed
    );
  };

  render() {
    return this.state.showModal ? (
      <Modal onClose={() => this.setState({ showModal: false })}>
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
