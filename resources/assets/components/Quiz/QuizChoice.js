import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../utilities/Card/Card';
import { contentfulImageUrl } from '../../helpers';

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
    <button
      type="button"
      className={classnames('choice', { 'background-image': backgroundImage })}
      onClick={() => selectChoice(questionId, id)}
      tabIndex={0}
    >
      <Card className={cardClasses}>
        {backgroundImage ? (
          <img
            src={contentfulImageUrl(backgroundImage, 300)}
            alt="quiz choice background"
          />
        ) : null}
        <p className="p-3">{title}</p>
      </Card>
    </button>
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
