import React from 'react';
import PropTypes from 'prop-types';
import './quiz.scss';

const Quiz = ({ quizId }) => (
  <article className="quiz">
    <h1>{ quizId }</h1>
  </article>
);

Quiz.propTypes = {
  quizId: PropTypes.string.isRequired,
};

export default Quiz;
