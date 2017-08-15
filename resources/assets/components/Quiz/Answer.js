import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ title }) => (
  <div className="answer">
    <p>{ title }</p>
  </div>
);

Answer.propTypes = {
  title: PropTypes.string,.isRequired,
};

export default Answer;
