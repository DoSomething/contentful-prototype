import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const Question = ({ title, id, quizId, answers, pickQuizAnswer }) => (
  <div className="question">
    <h2>{ title }</h2>
    {answers.map(answer => (
      <Answer
        {...answer}
        key={answer.id}
        pickQuizAnswer={pickQuizAnswer}
        questionId={id}
        quizId={quizId}
      />
    ))}
  </div>
);

Question.propTypes = {
  id: PropTypes.string.isRequired,
  quizId: PropTypes.string.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Question;
