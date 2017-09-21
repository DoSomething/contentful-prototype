import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-portal';
import './modal.scss';

class Modal extends React.Component {
  constructor() {
    super();

    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  handleOverlayClick(event) {
    if (event.target !== this.node) {
      return;
    }

    this.props.closeModal();
  }

  render() {
    const { shouldShowModal, children } = this.props;

    return (
      <Portal closeOnEsc isOpened={shouldShowModal}>
        <div className="modal" role="presentation" ref={node => this.node = node} onClick={this.handleOverlayClick}>
          <div className="modal__container">
            { children }
            <button className="modal__exit" onClick={this.props.closeModal}>×</button>
          </div>
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  shouldShowModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
