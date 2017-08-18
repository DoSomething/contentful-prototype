import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '../Card';

const Answer = ({ id, title, quizId, questionId, pickQuizAnswer, active }) => (
  <a
    className="answer"
    onClick={() => pickQuizAnswer(quizId, questionId, id)}
    role="button"
    tabIndex={0}
  >
    <Card className={classnames('bordered rounded padded-lg', { '-active': active })}>
      <p>{ title }</p>
    </Card>
  </a>
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
