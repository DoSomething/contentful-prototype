import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../Card';

const QuizChoice = props => {
  const {
    backgroundImage,
    id,
    isActive,
    isFaded,
    questionId,
    selectChoice,
    title,
  } = props;

  const cardClasses = classnames('bordered rounded', {
    '-active': isActive,
    faded: isFaded,
  });

  return (
    <a
      className={classnames('choice', { 'background-image': backgroundImage })}
      onClick={() => selectChoice(questionId, id)}
      role="button"
      tabIndex={0}
    >
      <Card className={cardClasses}>
        {backgroundImage ? (
          <img src={backgroundImage} alt="quiz choice background" />
        ) : null}
        <p className="padding-md">{title}</p>
      </Card>
    </a>
  );
};

QuizChoice.propTypes = {
  backgroundImage: PropTypes.string,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isFaded: PropTypes.bool,
  questionId: PropTypes.string.isRequired,
  selectChoice: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

QuizChoice.defaultProps = {
  backgroundImage: null,
  isFaded: false,
};

export default QuizChoice;
