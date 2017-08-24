import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '../Card';

const Answer = ({ id, title, quizId, questionId, pickQuizAnswer, isActive, shouldFade }) => (
  <a
    className="answer"
    onClick={() => pickQuizAnswer(quizId, questionId, id)}
    role="button"
    tabIndex={0}
  >
    <Card
      className={classnames('bordered rounded padding-lg', {
        '-active': isActive,
        fade: shouldFade,
      })}
    >
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
  isActive: PropTypes.bool.isRequired,
  shouldFade: PropTypes.bool.isRequired,
};

export default Answer;
