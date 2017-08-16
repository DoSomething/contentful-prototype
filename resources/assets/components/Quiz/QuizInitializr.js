import React from 'react';
import PropTypes from 'prop-types';

class QuizInitializr extends React.Component {
  componentDidMount() {
    const { quizId, quizInit } = this.props;
    quizInit(quizId);
  }

  render() {
    return null;
  }
}

QuizInitializr.propTypes = {
  quizId: PropTypes.string.isRequired,
  quizInit: PropTypes.func.isRequired,
};

export default QuizInitializr;
