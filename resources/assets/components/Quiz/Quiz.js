import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../Markdown';
import Question from './Question';

const Quiz = ({ content }) => (
  <div className="quiz">
    <h1 className="quiz__title">{content.title}</h1>
    { content.introduction ? <Markdown>{content.introduction}</Markdown> : null }
    { content.json.questions.map(question => (
      <Question key={question.title} question={question} />
    ))}
    { content.conclusion ? <Markdown>{content.conclusion}</Markdown> : null }
  </div>
);

Quiz.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    conclusion: PropTypes.string,
    json: PropTypes.object,
  }).isRequired,
};

export default Quiz;
