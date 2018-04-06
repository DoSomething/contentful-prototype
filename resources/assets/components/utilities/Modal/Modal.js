/* global window, document */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

import ModalContent from './ModalContent';

import './modal.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalPortal = document.getElementById('modal-portal');

    this.chrome = document.getElementById('chrome');
    this.el = document.createElement('div');
    this.el.className = 'wrapper';
    this.scrollOffset = window.scrollY;
  }

  componentDidMount() {
    this.chrome.classList.add('-lock');
    this.chrome.setAttribute('style', `transform: translateY(-${this.scrollOffset}px)`);
    this.modalPortal.classList.add('is-active');
    this.modalPortal.appendChild(this.el);
  }

  componentWillUnmount() {
    this.chrome.classList.remove('-lock');
    this.chrome.removeAttribute('style');
    window.scroll(0, this.scrollOffset);
    this.modalPortal.classList.remove('is-active');
    this.modalPortal.removeChild(this.el);
  }

  render() {
    const children = (
      <ModalContent onClose={this.props.onClose}>
        { this.props.children}
      </ModalContent>
    );

    return ReactDom.createPortal(children, this.el);
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
