import React from 'react';
import PropTypes from 'prop-types';

class ModalLauncher extends React.Component {
  componentDidMount() {
    const openModal = this.props.openModal.bind(this, this.props.modalType);
    this.timer = setTimeout(openModal, this.props.countdown * 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return null;
  }
}

ModalLauncher.propTypes = {
  openModal: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  countdown: PropTypes.number.isRequired,
};

export default ModalLauncher;
