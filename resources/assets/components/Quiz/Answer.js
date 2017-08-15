import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ answer }) => (
  <div className="answer">
    <p>{ answer.title }</p>
  </div>
);

Answer.propTypes = {
  answer: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default Answer;
