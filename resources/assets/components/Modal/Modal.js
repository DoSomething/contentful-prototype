import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-portal';
import ModalBeacon from '../Modal';
import './modal.scss';

class Modal extends React.Component {
  constructor() {
    super();

    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.trackModalState = this.trackModalState.bind(this);
  }

  componentDidMount() {
    this.trackModalState();
  }

  componentDidUpdate() {
    this.trackModalState();
  }

  handleOverlayClick(event) {
    if (event.target !== this.node) {
      return;
    }

    this.props.closeModal();
  }

  trackModalState() {
    const { modalType, shouldShowModal, trackEvent } = this.props;

    if (shouldShowModal) {
      trackEvent('open modal', { modalType });
    }
  }

  render() {
    const { shouldShowModal, children } = this.props;

    return (
      <Portal closeOnEsc isOpened={shouldShowModal}>
        <ModalBeacon>
          <div className="modal" role="presentation" ref={node => this.node = node} onClick={this.handleOverlayClick}>
            <div className="modal__container">
              { children }
              <button className="modal__exit" onClick={this.props.closeModal}>×</button>
            </div>
          </div>
        </ModalBeacon>
      </Portal>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  shouldShowModal: PropTypes.bool.isRequired,
  trackEvent: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  children: null,
  modalType: null,
};

export default Modal;
