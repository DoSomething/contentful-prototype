import React from 'react';
import PropTypes from 'prop-types';

import { SURVEY_MODAL } from '../Modal';
const SURVEY_COUNTDOWN = 5;

class Survey extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0,
    };

    this.incrementOrLaunch = this.incrementOrLaunch.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.timer = setInterval(this.incrementOrLaunch, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  incrementOrLaunch() {
    if (this.state.count < SURVEY_COUNTDOWN) {
      // For testing and sanity purposes
      console.log(SURVEY_COUNTDOWN - this.state.count, 'seconds to survey launch');

      this.setState(prevState => ({ count: prevState.count + 1 }));
    } else {
      this.props.openModal(SURVEY_MODAL);
      clearInterval(this.timer);
    }
  }

  render() {
    return null;
  }
}

Survey.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Survey;
