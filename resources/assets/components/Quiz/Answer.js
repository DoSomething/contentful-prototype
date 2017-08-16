import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ title, award, quizId, questionId, pickQuizAnswer }) => (
  <div className="answer">
    <button
      className="quiz-button"
      onClick={() => {
        pickQuizAnswer(quizId, questionId, award);
      }}
    >{ title }</button>
  </div>
);

Answer.propTypes = {
  title: PropTypes.string.isRequired,
  award: PropTypes.string.isRequired,
  quizId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
};

export default Answer;
