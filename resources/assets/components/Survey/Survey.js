/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import { SURVEY_MODAL } from '../Modal';

const SURVEY_COUNTDOWN = 5;
import { get, set } from '../../helpers/storage';

class Survey extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0,
    };

    this.incrementOrLaunch = this.incrementOrLaunch.bind(this);
  }

  componentDidMount() {
    // If the query params indicate a redirect from typeform post survey submission, track
    if (window.location.search === '?finished_nps=1') {
      set(`${this.props.userId}_finished_survey`, 'boolean', true);
    }

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
  userId: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

Survey.defaultProps = {
  userId: null,
};

export default Survey;
