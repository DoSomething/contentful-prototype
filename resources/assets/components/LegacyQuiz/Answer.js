import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '../Card';

const Answer = (props) => {
  const {
    id, title, quizId, questionId, pickQuizAnswer,
    isActive, isFaded, backgroundImage,
  } = props;

  const classes = classnames('bordered rounded', {
    '-active': isActive,
    faded: isFaded,
  });

  return (
    <a
      className="answer"
      onClick={() => pickQuizAnswer(quizId, questionId, id)}
      role="button"
      tabIndex={0}
    >
      <Card className={classes}>
        { backgroundImage ? <img src={backgroundImage} alt="" /> : null }
        <p className="padding-lg">{ title }</p>
      </Card>
    </a>
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
