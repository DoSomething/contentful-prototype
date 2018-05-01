import React from 'react';
import PropTypes from 'prop-types';

import Card from '../utilities/Card/Card';
import Markdown from '../utilities/Markdown/Markdown';

const QuizConclusion = props => {
  const { children, callToAction } = props;

  return (
    <Card className="quiz-conclusion rounded bordered">
      <div className="conclusion__item -one-third padding-md">{children}</div>
      <div className="conclusion__item -two-thirds padding-md">
        <Markdown className="conclusion__cta">{callToAction}</Markdown>
      </div>
    </Card>
  );
};

QuizConclusion.propTypes = {
  children: PropTypes.node.isRequired,
  callToAction: PropTypes.string.isRequired,
};

export default QuizConclusion;
