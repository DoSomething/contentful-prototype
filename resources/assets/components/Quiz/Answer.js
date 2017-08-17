import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '../Card';

const Answer = ({ id, title, quizId, questionId, pickQuizAnswer, active }) => (
  <Card
    className={classnames('answer bordered rounded padded-lg', { '-active': active })}
    onClick={() => pickQuizAnswer(quizId, questionId, id)}
  >
    <p>{ title }</p>
  </Card>
);

Answer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quizId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Answer;
