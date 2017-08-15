import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../Markdown';
import Question from './Question';

const Quiz = ({ fields }) => (
  <div className="quiz">
    <h1 className="quiz__title">{fields.title}</h1>
    <Markdown>{fields.introduction}</Markdown>
    {fields.questions.map(question => (
      <Question key={question.id} question={question} />
    ))}
    <Markdown>{fields.conclusion}</Markdown>
  </div>
);

Quiz.propTypes = {
  fields: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    conclusion: PropTypes.string,
    questions: PropTypes.object,
  }).isRequired,
};

export default Quiz;
