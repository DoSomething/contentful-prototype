import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../utilities/Card/Card';

const Answer = props => {
  const {
    id,
    title,
    quizId,
    questionId,
    pickQuizAnswer,
    isActive,
    isFaded,
    backgroundImage,
  } = props;

  const classes = classnames('bordered rounded', {
    '-active': isActive,
    faded: isFaded,
  });

  return (
    <button
      type="button"
      className="answer"
      onClick={() => pickQuizAnswer(quizId, questionId, id)}
      tabIndex={0}
    >
      <Card className={classes}>
        {backgroundImage ? <img src={backgroundImage} alt="" /> : null}
        <p className="p-6">{title}</p>
      </Card>
    </button>
  );
};

Answer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  quizId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isFaded: PropTypes.bool.isRequired,
};

Answer.defaultProps = {
  backgroundImage: null,
};

export default Answer;
