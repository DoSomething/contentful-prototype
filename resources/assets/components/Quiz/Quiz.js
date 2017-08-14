import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

const Quiz = ({ content }) => (
  <Card>
    <div className="quiz">
      <h1>{content.title}</h1>
    </div>
  </Card>
);

Quiz.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
};

export default Quiz;
