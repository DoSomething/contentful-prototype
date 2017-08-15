import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ question }) => (
  <div className="question">
    <h2>{ question.title }</h2>
  </div>
);

Question.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default Question;
