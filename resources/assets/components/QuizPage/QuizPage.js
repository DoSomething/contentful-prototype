import React from 'react';
import PropTypes from 'prop-types';
import './quiz-page.scss';

const QuizPage = ({ quizzes }) => (
  <article className="quiz-page">
    {quizzes.map(quiz => (
      <h1 key={quiz}>{quiz}</h1>
    ))}
  </article>
);

QuizPage.propTypes = {
  quizzes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QuizPage;
