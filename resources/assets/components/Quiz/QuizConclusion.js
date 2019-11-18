import React from 'react';
import PropTypes from 'prop-types';

import Card from '../utilities/Card/Card';
import TextContent from '../utilities/TextContent/TextContent';

const QuizConclusion = props => {
  const { children, callToAction } = props;

  return (
    <Card className="quiz-conclusion bordered overflow-hidden rounded">
      <div className="conclusion__item -one-third p-3">{children}</div>
      <div className="conclusion__item -two-thirds p-3">
        <TextContent className="conclusion__cta">{callToAction}</TextContent>
      </div>
    </Card>
  );
};

QuizConclusion.propTypes = {
  children: PropTypes.node.isRequired,
  callToAction: PropTypes.string.isRequired,
};

export default QuizConclusion;
