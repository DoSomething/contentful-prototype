import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const Question = ({ question }) => (
  <div className="question">
    <h2>{ question.title }</h2>
    {question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} />
    ))}
  </div>
);

Question.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string,
    answers: PropTypes.array,
  }).isRequired,
};

export default Question;
