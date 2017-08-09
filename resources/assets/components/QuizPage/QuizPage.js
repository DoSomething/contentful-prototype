import React from 'react';
import PropTypes from 'prop-types';
import './quiz-page.scss';

const QuizPage = ({ quizId }) => (
  <article className="quiz">
    <h1>{ quizId }</h1>
  </article>
);

QuizPage.propTypes = {
  quizId: PropTypes.string,
};

QuizPage.defaultProps = {
  quizId: null,
};

export default QuizPage;
