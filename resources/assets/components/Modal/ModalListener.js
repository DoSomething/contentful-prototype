import React from 'react';
import PropTypes from 'prop-types';

function ModalListenerConnector(WrappedComponent) {
  class ModalListener extends React.Component {
    render() {
      const withinModal = this.context.withinModal;

      return (
        <WrappedComponent withinModal={withinModal} />
      );
    }
  }

  ModalListener.contextTypes = {
    withinModal: PropTypes.bool,
  };

  return ModalListener;
}

export default Listener;
