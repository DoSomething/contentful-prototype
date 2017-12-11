import React from 'react';
import PropTypes from 'prop-types';

function ModalListenerConnector(WrappedComponent) {
  const ModalListener = (props, context) => (
    <WrappedComponent withinModal={context.withinModal} />
  );

  ModalListener.contextTypes = {
    withinModal: PropTypes.bool,
  };

  return ModalListener;
}

export default ModalListenerConnector;
