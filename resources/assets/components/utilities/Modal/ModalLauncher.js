import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Modal from './Modal';
import { isTimestampValid, env, query } from '../../../helpers';
import { get as getStorage, set as setStorage } from '../../../helpers/storage';

class ModalLauncher extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };
  }

  componentDidMount() {
    const { countdown, type } = this.props;

    // If the query params indicate to store the feature modal to be hidden, store it.
    if (query(`hide_${type}`) === '1') {
      setStorage(`hide_${type}`, 'boolean', true);
    }

    if (this.shouldSeeModal()) {
      this.timer = setTimeout(() => {
        this.setState({ showModal: true });
      }, countdown * 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  shouldSeeModal = () => {
    const { type } = this.props;

    let shouldNotSee = getStorage(`hide_${type}`, 'boolean');
    // Support for legacy nps survey 'hide feature' storage format.
    if (type === 'nps_survey' && !shouldNotSee) {
      shouldNotSee = getStorage('finished_survey', 'boolean');
    }

    // Check if the survey was dismissed over 30 days ago.
    const dismissalTime = getStorage(`dismissed_${type}`, 'timestamp');
    const isDismissed = isTimestampValid(dismissalTime, 30 * 1440 * 60 * 1000);

    return (
      env(`${type.toUpperCase()}_ENABLED`) && !shouldNotSee && !isDismissed
    );
  };

  handleClose = () => {
    const { type } = this.props;

    // Mark this modal as "dismissed" in local storage & close.
    setStorage(`dismissed_${type}`, 'timestamp', Date.now());
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
  type: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
};

ModalLauncher.defaultProps = {};

export default ModalLauncher;
