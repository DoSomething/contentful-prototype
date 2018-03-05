import React from 'react';
import PropTypes from 'prop-types';

class ModalLauncher extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0,
    };

    this.incrementOrLaunch = this.incrementOrLaunch.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.incrementOrLaunch, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  incrementOrLaunch() {
    if (this.state.count < this.props.countdown) {
      this.setState(prevState => ({ count: prevState.count + 1 }));
    } else {
      this.props.openModal(this.props.modalType);
      clearInterval(this.timer);
    }
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
