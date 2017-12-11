import React from 'react';
import PropTypes from 'prop-types';

class ModalBeacon extends React.Component {
  getChildContext() {
    return {
      withinModal: true,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

ModalBeacon.childContextTypes = {
  withinModal: PropTypes.bool,
};

export default ModalBeacon;
