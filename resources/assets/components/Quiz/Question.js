import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const Question = ({ title, answers }) => (
  <div className="question">
    <h2>{ title }</h2>
    {answers.map(answer => (
      <Answer key={answer.id} answer={...answer} />
    ))}
  </div>
);

Question.propTypes = {
  title: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
};

export default Question;
