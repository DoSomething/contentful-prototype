import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../Markdown';
import Question from './Question';
import { makeHash } from '../../helpers';

const Quiz = ({ quiz }) => (
  <div className="quiz">
    <h1 className="quiz__title">{quiz.title}</h1>
    { quiz.introduction ? <Markdown>{quiz.introduction}</Markdown> : null }
    { quiz.json.questions.map(question => (
      <Question key={makeHash(question.title)} question={question} />
    )) }
    { quiz.conclusion ? <Markdown>{quiz.conclusion}</Markdown> : null }
  </div>
);

Quiz.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    conclusion: PropTypes.string,
    json: PropTypes.object,
  }).isRequired,
};

export default Quiz;
